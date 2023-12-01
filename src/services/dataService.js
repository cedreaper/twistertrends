export async function requestData(
        url,
        method = "GET",
        body = null,
        customHeaders = {}
      ) {
        try {
          const headers = { ...customHeaders };
      
          if (method === "POST" && !headers["Content-Type"]) {
            headers["Content-Type"] = "application/json";
          }
      
          const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
          });
      
          if (response.ok) {
            const text = await response.text();
            if (text) {
              return JSON.parse(text);
            } else {
              console.warn("Received empty response");
              return null;
            }
          } else {
            throw new Error(
              `Server returned an error: ${response.status} ${response.statusText}`
            );
          }
        } catch (error) {
          console.error("API request failed:", error);
          throw error;
        }
    }

    export async function pullTornadoData(url, setterFunction, counties, months, years) {
        try {
          const response = await requestData(url);
      
          let data = Object.values(response.records);
      
          if (counties[0] !== 'all') {
            data = data.filter((record) => counties.includes(record.county));
          }
      
          if (counties[0] === 'all') {
            data = response.records;
          }
          
          if (years.length > 0) {
            data = data.filter((record) => years.includes(record.start.substring(0, 4)));
          }

          const monthlyCounts = Array(months.length).fill(0);
    
          data.forEach((record) => {
            const recordDate = new Date(record.start);
            const recordMonth = recordDate.toLocaleString('default', { month: 'long' });
            const monthIndex = months.indexOf(recordMonth);
            if (monthIndex !== -1) {
              monthlyCounts[monthIndex]++;
            }
          });
          console.log(monthlyCounts);
          setterFunction(monthlyCounts);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      export async function pullTemperatureData(url, setterFunction, selectedMonths, selectedYears) {
        try {
            const needsIdParam = !selectedYears.includes('all') || !selectedMonths.includes('all');
            if (needsIdParam) {
                url = `${url}?id=1`;
            }
    
            const response = await requestData(url);
            let data = response.records;
    
            const monthIndexMapping = {
                'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4,
                'June': 5, 'July': 6, 'August': 7, 'September': 8, 'October': 9,
                'November': 10, 'December': 11
            };
    
            let selectedMonthIndices = selectedMonths.includes('all') 
                ? Object.values(monthIndexMapping) 
                : selectedMonths.map(month => monthIndexMapping[month]);
    
            let temperatureSums = Array(selectedMonthIndices.length).fill(0);
            let temperatureCounts = Array(selectedMonthIndices.length).fill(0);
    
            data.forEach((record) => {
                let recordMonthIndex;
                let recordYear;
    
                if (needsIdParam) {
                    const recordDate = new Date(record.date);
                    recordMonthIndex = recordDate.getMonth();
                    recordYear = recordDate.getFullYear().toString();
                } else {
                    recordMonthIndex = monthIndexMapping[record.month];
                    recordYear = 'all';
                }
    
                const selectedIndex = selectedMonthIndices.indexOf(recordMonthIndex);
                if (selectedIndex !== -1 && 
                    (selectedYears.includes('all') || selectedYears.includes(recordYear))) {
                        temperatureSums[selectedIndex] += parseFloat(record.temp);
                        temperatureCounts[selectedIndex]++;
                }
            });
    
            let monthlyAverages = temperatureSums.map((sum, index) => {
                return temperatureCounts[index] > 0 ? sum / temperatureCounts[index] : null;
            });
    
            setterFunction(monthlyAverages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const mapTornadoSizeToScale = (size) => {
        if (size === "No Recorded Info") {
            size = "F0";
        }
    
        const sizeMapping = {
            'EF0': 0.5, 'F0': 0.5, 'EFU': 0.5,
            'EF1': 1, 'F1': 1,
            'EF2': 2, 'F2': 2,
            'EF3': 3, 'F3': 3,
            'EF4': 4, 'F4': 4,
            'EF5': 5, 'F5': 5
        };
    
        return sizeMapping[size] || 0; 
    };

    const applyClusteredSkew = (temp, index, total) => {
        const skewFactor = 0.19; 
        const angle = (Math.PI * 4) / total;
        const radius = skewFactor * Math.sqrt(index); 
    
        return temp + radius * Math.cos(angle * index);
    };

    export async function pullAnomalyData(url, setterFunction, selectedMonths, selectedYears) {
        try {
           
            url = `${url}?id=1`;
    
            const response = await requestData(url);
            let data = response.records;
    
            const monthIndexMapping = {
                'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4,
                'June': 5, 'July': 6, 'August': 7, 'September': 8, 'October': 9,
                'November': 10, 'December': 11
            };
    
            let selectedMonthIndices = selectedMonths.includes('all') 
                ? Object.values(monthIndexMapping) 
                : selectedMonths.map(month => monthIndexMapping[month]);
    
            let anomalySums = Array(selectedMonthIndices.length).fill(0);
            let anomalyCounts = Array(selectedMonthIndices.length).fill(0);
    
            data.forEach((record) => {
                const recordDate = new Date(record.date);
                const recordMonthIndex = recordDate.getMonth();
                const recordYear = recordDate.getFullYear().toString();
    
                const selectedIndex = selectedMonthIndices.indexOf(recordMonthIndex);
                if (selectedIndex !== -1 && 
                    (selectedYears.includes('all') || selectedYears.includes(recordYear))) {
                        anomalySums[selectedIndex] += parseFloat(record.anomaly);
                        anomalyCounts[selectedIndex]++;
                }
            });
    
            let monthlyAnomalies = anomalySums.map((sum, index) => {
                return anomalyCounts[index] > 0 ? sum / anomalyCounts[index] : null;
            });
    
            setterFunction(monthlyAnomalies);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    export async function pullTornadoSizeData(url, averageTemperatures, setterFunction, selectedCounties, selectedMonths, selectedYears) {
        try {
            const response = await requestData(url);
            let tornadoData = response.records;
    
            let groupedByMonth = {};
            tornadoData.forEach((record) => {
                const recordDate = new Date(record.start);
                const recordMonthIndex = recordDate.getMonth();
                const recordYear = recordDate.getFullYear().toString();
                const recordCounty = record.county;
                const recordMonthName = recordDate.toLocaleString('default', { month: 'long' });
    
                const isCountyMatch = selectedCounties.includes('all') || selectedCounties.includes(recordCounty);
                const isMonthMatch = selectedMonths.includes('all') || selectedMonths.includes(recordMonthName);
                const isYearMatch = selectedYears.includes('all') || selectedYears.includes(recordYear);
    
                if (isCountyMatch && isMonthMatch && isYearMatch) {
                    if (!groupedByMonth[recordMonthIndex]) {
                        groupedByMonth[recordMonthIndex] = [];
                    }
                    groupedByMonth[recordMonthIndex].push({
                        size: mapTornadoSizeToScale(record.size),
                        year: recordYear
                    });
                }
            });
    
            let tornadoSizeTempPairs = [];
            Object.keys(groupedByMonth).forEach(monthIndex => {
                groupedByMonth[monthIndex].forEach((tornado, index) => {
                    let avgTemp = averageTemperatures[monthIndex];
                    avgTemp = applyClusteredSkew(avgTemp, index, groupedByMonth[monthIndex].length);
    
                    tornadoSizeTempPairs.push({ size: tornado.size, temp: avgTemp });
                });
            });
    
            setterFunction(tornadoSizeTempPairs);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
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
      
          // Filter data based on selected counties, months, and years
          data = data.filter((record) => {
            const { county, start } = record;
      
            // Filter by counties
            if (counties.length > 0 && !counties.includes(county)) {
              return false;
            }
      
            // Parse the date and extract month and year
            const recordDate = new Date(start);
            const recordMonth = recordDate.getMonth() + 1; // Months are 0-based in JavaScript
            const recordYear = recordDate.getFullYear();
      
            // Filter by months
            if (months.length > 0) {
                const recordMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(recordDate);
                if (!months.includes(recordMonthName)) {
                  return false;
                }
              }
      
            // Filter by years
            if (years.length > 0 && !years.includes(recordYear.toString())) {
              return false;
            }
      
            return true;
          });
          
           // Create an array to store counts for each selected month
    const monthlyCounts = Array(months.length).fill(0);

    // Count tornadoes per month
    data.forEach((record) => {
      const recordDate = new Date(record.start);
      const recordMonth = recordDate.toLocaleString('default', { month: 'long' }); // Get full month name
      const monthIndex = months.indexOf(recordMonth);
      console.log(monthIndex);
      console.log(recordMonth);
      if (monthIndex !== -1) {
        monthlyCounts[monthIndex]++;
      }
    });
      

         console.log(monthlyCounts)
          setterFunction(monthlyCounts);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
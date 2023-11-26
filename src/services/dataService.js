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

    export async function pullTornadoData(url, setterFunction, recordIndex = null, filterFunction = null) {
        try {
          const response = await requestData(url);
      
          let data;
          if (recordIndex !== null) {
            data = Object.values(response.records[recordIndex]);
          } else if (filterFunction !== null) {
            data = response.records.filter(filterFunction);
          } else {
            data = response.records;
          }
      
          console.log(data);
          setterFunction(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };


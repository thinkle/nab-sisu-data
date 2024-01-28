import type { GraphData } from "./dataMassager";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzk98OVHL83TMC-aVLPtuUBKtytpplm-Wr_Pljb5Ne42WsAkyjvJ_tGPSM9JcAZplcM/exec";

export const getData = async (): Promise<GraphData[]> => {
  try {
    const response = await fetch(GAS_URL, {
      method: "GET",
      redirect: "follow", // Follow redirects
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    /*const data = rawData.map((plunge: any): GraphData => {
      plunge.date = new Date(plunge.date);
      return plunge;
    });
    */
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const postData = async (
  data: GraphData,
  secret: string
): Promise<void> => {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      redirect: "follow", // Follow redirects
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data, // Spread the data object to include all its properties
        secret, // Include the user-provided secret for authentication
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resultText = await response.text(); // Assuming the response is text
    console.log(resultText);

    // Optionally, you can throw an error if the response text indicates failure
    if (resultText.includes("Invalid secret")) {
      throw new Error("Invalid secret provided.");
    }
  } catch (error) {
    console.error("Post error:", error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};

import axios from "axios";

export const Config = {
  // replace this key with yours
  publicKey: "test_public_key_3fd776623e324a5c9333982a305b44c2",
  productIdentity: "1234567890",
  productName: "Gig Day",
  productUrl: "http://localhost:3000/",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verification
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      let config = {};

      axios
        .post("https://nepal-groove-backend-hrxj.vercel.app/api/v2/khalti/verify", data, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(payload);
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

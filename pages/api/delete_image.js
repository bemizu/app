import axios from "axios";




export default (req, res) => {
  const { data } = req.body


  axios
    .delete("https://api.uploadcare.com/files/" + data.storageId + "/storage/", {
        headers: {
            "Authorization": `Uploadcare.Simple ${ process.env.UPLOADCARE_PUBLIC }:${ process.env.UPLOADCARE_PRIVATE }`
        }
    })
    .then(function (response) {
      // handle success
      res.statusCode = 200;
      res.json({ name: "John Doe" });
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      res.statusCode = 400;
      res.json({ name: "Jane Doe" });
      console.log(error);
    })
    // .then(function () {
    //   // always executed

    //   res.json({ name: "Done" });
    //   console.log("done")
    // });
  
};

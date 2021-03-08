const client = require('@sendgrid/client');

export default async function(req, res) {
  
  client.setApiKey(process.env.SENDGRID_API_KEY);

  const { data } = req.body
  

  let listId = data.value == "employee" ? "decdc17f-d421-445d-b609-4185c54d0a60" : "1deb6a7e-00df-438a-ba6e-cd7d6ac650db";

  const request = {
    method: 'PUT',
    url: '/v3/marketing/contacts', 
    body: {
        contacts: [{ email: data.email }],
        list_ids: [ listId ]
    }
  };

  try {
    let sendgridResp = await client.request(request)
    res.status(200).send(sendgridResp)
  } catch (error) {
    // console.log('ERROR', error)
    res.status(400).send( error )
  }

}



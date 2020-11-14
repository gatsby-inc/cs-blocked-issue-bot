import fetch from 'node-fetch';

export default async (data) => {
  console.log(data);
  await fetch(process.env.SLACK_WEBHOOK, { 
    method: 'POST', 
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => console.log(res.status))); 
};
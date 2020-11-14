import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const getTicketsByTag = async labelId => {
  return await fetch(`https://api.clubhouse.io/api/v3/stories/search`, {
    method: 'post',
    body: JSON.stringify({
      archived: false,
      project_id: 15679, 
      label_ids: [labelId]
    }),
    headers: {
      'Content-Type': 'application/json',
      'Clubhouse-Token': process.env.CLUBHOUSE_TOKEN
    }
  }).catch(x => console.error(x.body))
  .then(res => res.json())
  .then(data => data);  
}

export default async () => {
  let p0bugs = await getTicketsByTag(15201);
  let p1bugs = await getTicketsByTag(15200);
  let p2bugs = await getTicketsByTag(15199);
  let p3bugs = await getTicketsByTag(15198);
  
  return await {
    "blocks": [
      {
    		"type": "section",
    		"text": {
    			"type": "mrkdwn",
    			"text": `:rolled_up_newspaper: *Morning CS Ticket Count*:`
    		}
      },
      {
    		"type": "section",
    		"text": {
    			"type": "mrkdwn",
    			"text": `• \`${p0bugs.length}\` P0 bugs open\n• \`${p1bugs.length}\` P1 bugs open\n• \`${p2bugs.length}\` P2 bugs open\n• \`${p3bugs.length}\` P3 bugs open`
    		}
      },
    ]
  }
}
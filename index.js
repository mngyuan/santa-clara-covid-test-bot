const fetch = require('node-fetch');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function findAppointmentBySite(date, site) {
  const fetchRes = await fetch(
    `https://scl.fulgentgenetics.com/api/slots/${site.siteid}`,
  );
  console.log(new Date(), 'Polling', fetchRes.status, site.name);
  const json = await fetchRes.json();
  const availableAppt = json.find(
    (appt) => appt.date === date && appt.slots_left > 0,
  );
  if (availableAppt) {
    console.log('FOUND', availableAppt, 'AT', site.name);
    return availableAppt;
  }
  return null;
}

async function findAppointment(date) {
  const sitesRes = await fetch(
    'https://scl.fulgentgenetics.com/api/sites/slot-sites',
  );
  const json = await sitesRes.json();
  let availableAppts;
  while (1) {
    availableAppts = (
      await Promise.all(
        json.sites.map((site) => findAppointmentBySite(date, site)),
      )
    ).filter((a) => a);
    if (availableAppts.length > 0) {
      break;
    }
    await sleep(10 * 1000);
  }
}

findAppointment('2020-12-18');

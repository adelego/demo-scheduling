const URL = "https://2cm3trs6ge.execute-api.eu-west-1.amazonaws.com/prod";
const baseDate = "2022-08-06";

export const publishEvent = async (message, author, time) => {
  const [hours, minutes, seconds] = time.split(":");
  const date = new Date(baseDate);
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  date.setSeconds(parseInt(seconds));

  await fetch(
    `${URL}?author=${author}&message=${message}&dateTimestamp=${(
      date.getTime() / 1000
    ).toString()}`
  );
};

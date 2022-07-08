const URL = "https://2cm3trs6ge.execute-api.eu-west-1.amazonaws.com/prod";
const baseDate = "2022-08-06";

export const publishEvent = async (message, author, time) => {
  await fetch(
    `${URL}?author=${author}&message=${message}&dateTimestamp=${time
      .getTime()
      .toString()}`
  );
};

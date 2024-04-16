import { createChecklyContext } from '../utils/checklyRequestContext';

export async function validateStorageState(apiKey, accountID) {
  const context = await createChecklyContext(apiKey, accountID);

  let responseTime = await context.get(`variables/DEV_COOKIE_TIME`);
  let responseData = await responseTime.json();
  const variableUnixTime = responseData.value; // Assuming the value is already in seconds
  const unixCurrentTime = Math.floor(Date.now() / 1000);

  // Calculate the difference in seconds
  const differenceInSeconds = unixCurrentTime - variableUnixTime;

  // Check if the difference is greater than or equal to 3600 seconds (1 hour)
  if (differenceInSeconds >= 3600) {
    throw new Error('More than an hour has passed since DEV_COOKIE_TIME was updated.');
  } else {
    let responseStorageState = await context.get(`variables/DEV_STORAGE_STATE`);
    let responseData = await responseStorageState.json();
    const handledStorageState = JSON.parse(responseData.value);

    // Return the storage state
    return handledStorageState;
  }
}

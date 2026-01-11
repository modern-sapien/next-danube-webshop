import { createChecklyContext } from './checklyRequestContext';
import { defaults } from '../defaults';

export async function validateStorageState(apiKey: string, accountID: string) {
  const context = await createChecklyContext(apiKey, accountID);

  const cookieTimeVarName = defaults.checklyVars.cookieTime;
  const storageStateVarName = defaults.checklyVars.storageState;

  let responseTime = await context.get(`variables/${cookieTimeVarName}`);
  let responseData = await responseTime.json();
  const variableUnixTime = responseData.value;
  const unixCurrentTime = Math.floor(Date.now() / 1000);

  const differenceInSeconds = unixCurrentTime - variableUnixTime;

  if (differenceInSeconds >= 3600) {
    throw new Error(`More than an hour has passed since ${cookieTimeVarName} was updated.`);
  } else {
    let responseStorageState = await context.get(`variables/${storageStateVarName}`);
    let responseData = await responseStorageState.json();
    const handledStorageState = JSON.parse(responseData.value);

    return handledStorageState;
  }
}

export default (key: string, split = ' ') => {
  const env = process.env[key];
  if (env === undefined) {
    throw new ReferenceError(`Environment variable ${key} is not defined.`);
  }
  return env.split(split);
}
// Converts all of the command line arguments into a single string
export const collectArguments = (argv: string[]): string => argv.slice(2).join(' ')

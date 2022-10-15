export const TOKEN_NAME = 'smart_key'

export const shortenAddress = (address: string) => `${address.slice(0, 5)}....${address.slice(address.length - 4)}`
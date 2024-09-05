export const getTokenUSDPrice = async (address: string): Promise<number> => {
  const response = await fetch(
    `https://api.mobula.io/api/1/market/data?asset=${address}&blockchain=100`,
    {
      method: 'GET',
      headers: {
        Authorization: process.env.NEXT_PUBLIC_MOBULA_API_KEY || '',
      },
    }
  );

  const data = await response.json();

  return data.data.price;
};

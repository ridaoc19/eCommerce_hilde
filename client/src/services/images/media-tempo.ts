export const media_tempoApi = async ({ media, location }: { media: string[], location: string }) => {
  const response = await fetch(`${process.env.REACT_APP_URL_API}/media-tempo/create/${location}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(media),
  });

  return response.json();
}
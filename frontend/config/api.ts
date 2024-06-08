async function fetchData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return res.json();
}

export async function fetchVideoList(
  API_BASE_URL: string,
  categoryId?: string,
  page?: number,
  keyword?: string,
  hours?: number
) {
  const params = new URLSearchParams();
  params.append('ac', 'list');
  if (categoryId) {
    params.append('t', categoryId);
  }
  if (page) {
    params.append('pg', page.toString());
  }
  if (keyword) {
    params.append('wd', keyword);
  }
  if (hours) {
    params.append('h', hours.toString());
  }

  const url = `${API_BASE_URL}?${params.toString()}`;
  return fetchData(url);
}

// 获取视频详情
export async function fetchVideoDetails(
  API_BASE_URL: string,
  ids?: string[],
  typeId?: string,
  page?: number,
  hours?: number
) {
  const params = new URLSearchParams();
  params.append('ac', 'detail');
  if (ids && ids.length > 0) {
    params.append('ids', ids.join(','));
  }
  if (typeId) {
    params.append('t', typeId);
  }
  if (page) {
    params.append('pg', page.toString());
  }
  if (hours) {
    params.append('h', hours.toString());
  }

  const url = `${API_BASE_URL}?${params.toString()}`;
  return fetchData(url);
}
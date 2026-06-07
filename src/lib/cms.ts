// CMS数据加载工具 - 从content/目录加载CMS生成的JSON数据

const DEFAULT_TIMEOUT = 3000;

async function fetchWithTimeout(url: string, timeout = DEFAULT_TIMEOUT): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function loadCMSData<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetchWithTimeout(path);
    if (!res.ok) return fallback;
    const data = await res.json();
    return data || fallback;
  } catch {
    return fallback;
  }
}

// 加载董事长信息
export function loadChairmanData(fallback: any) {
  return loadCMSData('/content/chairman.json', fallback);
}

// 加载载体列表
export function loadCarriersData(fallback: any[]) {
  return loadCMSData('/content/carriers.json', fallback);
}

// 加载孵化器列表
export function loadIncubatorsData(fallback: any[]) {
  return loadCMSData('/content/incubators.json', fallback);
}

// 加载商旅文化列表
export function loadCultureData(fallback: any[]) {
  return loadCMSData('/content/culture.json', fallback);
}

// 加载公司信息
export function loadCompanyData(fallback: any) {
  return loadCMSData('/content/company.json', fallback);
}

// 检查CMS是否可用（通过检查content目录是否存在）
export async function isCMSAvailable(): Promise<boolean> {
  try {
    const res = await fetchWithTimeout('/content/chairman.json', 2000);
    return res.ok;
  } catch {
    return false;
  }
}

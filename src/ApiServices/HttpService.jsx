import { getJwt } from '../ApiServices/JwtService';

export const get = async (url, headers) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      const error = new Error(errorData.message || 'An error occurred');
      error.status = res.status;
      error.data = errorData;
      throw error;
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};

export const post = async (url, body, headers) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      // credentials: 'include',
      body: JSON.stringify(body),
    });

    if (res.status == 201 || res.status == 204) {
      return;
    }

    if (!res.ok) {
      const errorData = await res.json();
      const error = new Error(errorData.message || 'An error occurred');
      error.status = res.status;
      error.data = errorData;
      throw error;
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};

export const formPost = async (url, body, headers) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      // credentials: 'include',
      body: body,
    });

    if (res.status == 201) {
      return;
    }

    if (!res.ok) {
      const errorData = await res.json();
      const error = new Error(errorData.message || 'An error occurred');
      error.status = res.status;
      error.data = errorData;
      throw error;
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};

export const put = async (url, body, headers) => {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (res.status == 204) {
      return;
    }

    if (!res.ok) {
      const errorData = await res.json();
      const error = new Error(errorData.message || 'An error occurred');
      error.status = res.status;
      error.data = errorData;
      throw error;
    }

    return res.json();
  } catch (err) {
    return { err };
  }
};

export const formPut = async (url, body, headers) => {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
      body: body,
    });

    if (res.status == 204) {
      return;
    }

    if (!res.ok) {
      const errorData = await res.json();
      const error = new Error(errorData.message || 'An error occurred');
      error.status = res.status;
      error.data = errorData;
      throw error;
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};

export const remove = async (url, headers) => {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        ...headers,
      },
    });

    if (res.status == 204) {
      return;
    }

    if (!res.ok) {
      const errorData = await res.json();
      const error = new Error(errorData.message || 'An error occurred');
      error.status = res.status;
      error.data = errorData;
      throw error;
    }

    return res.json();
  } catch (err) {
    throw err;
  }
};

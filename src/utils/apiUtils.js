// api/apiUtils.js

import { toast } from 'react-toastify';

export async function fetchData(endpoint, token = null) {
  try {
    const options = {
      headers: {
        ...(token && { Authorization: `${token}` }) // Include token if provided
      }
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getById(endpoint, id, token = null) {
  try {
    const url = `${endpoint}/${id}`;
    const response = await fetchData(url, token);
    return response;
  } catch (error) {
    console.error(`Error fetching data by ID (${id}):`, error);
    throw error;
  }
}

export async function postData(endpoint, data, token = null) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `${token}` }) // Include token if provided
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      toast.error(`${errorResponse.error}`);
      throw new Error(errorResponse.error);
    }
    console.log(response, "log");
    toast.success('Data posted successfully!');
    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}

export async function updateData(endpoint, data, token = null) {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `${token}` }) // Include token if provided
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      toast.error(`${errorResponse.error}`);
      throw new Error(errorResponse.error);
    }

    toast.success('Data updated successfully!');
    return await response.json();
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

export async function deleteData(endpoint, token = null) {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `${token}` }) // Include token if provided
      }
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      toast.error(`${errorResponse.error}`);
      throw new Error(errorResponse.error);
    }

    const data = await response.json();
    toast.success('Data deleted successfully!');
    console.log('Delete successful:', data);
    return data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}

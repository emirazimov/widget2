import * as axios from 'axios'

const jwtToken = localStorage.getItem('Authorization')

const axiosInstance = axios.create({
  baseURL: `https://api.bookinglane.com/api/`,
  headers: {
    Authorization: 'Bearer ' + jwtToken,
    'Access-Control-Allow-Origin': '*',
  },
})

export const authApi = {
  getToken() {
    const company0Key = '14862f6b-0e7a-47d0-810a-06a348fd9ec1'
    return axios
      .post(
        'https://api.bookinglane.com/api/companywidget/company-widget-auth',
        { accessKey: '14862f6b-0e7a-47d0-810a-06a348fd9ec1' }
      )
      .then((response) => {
        return response
      })
      .then((response) => {
        window.localStorage.setItem('Authorization', response.data.jwtToken)
      })
  },

  getCompanyProfile() {
    const jwtToken = localStorage.getItem('Authorization')

    const headers = {
      Authorization: 'Bearer ' + jwtToken,
      'Access-Control-Allow-Origin': '*',
    }

    return axiosInstance
      .get('companywidget/company-widget-info', { headers: headers })
      .then((response) => {
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response.status
        }
      })
  },
}

export const fleetApi = {
  getCarsByType(carType, pageSize) {
    return axiosInstance
      .get(`car/company-cars?typeId=${carType}&page=${pageSize}`)
      .then((response) => {
        return response.data
      })
  },

  getCompanyCars(dataForm) {
    return axiosInstance
      .post('car/companycars-withprice', { ...dataForm })
      .then((response) => {
        return response.data
      })
  },
}

export const placesApi = {
  getStates() {
    return axiosInstance.get(`place/states`).then((response) => {
      return response.data
    })
  },

  getCities(id) {
    return axiosInstance.get(`place/cities/${id}`).then((response) => {
      return response.data
    })
  },

  getAirlines() {
    return axiosInstance.get(`place/airlines`).then((response) => {
      return response.data
    })
  },
}

export const formApi = {
  createReservation(form) {
    return axiosInstance
      .post(`reservation/web`, { ...form })
      .then((response) => {
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response.status
        }
      })
  },
}

export const termsApi = {
  getTermOfUse() {
    return axiosInstance.get(`home/term-of-use`).then((response) => {
      return response.data
    })
  },
  getPrivacyPolicy() {
    return axiosInstance.get(`home/privacy-policy`).then((response) => {
      return response.data
    })
  },
}

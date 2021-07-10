import * as axios from "axios"

const jwtToken = localStorage.getItem("Authorization")

const axiosInstance = axios.create({
  baseURL: `http://ec2-18-118-140-167.us-east-2.compute.amazonaws.com/api/`,
  headers: {
    'Authorization': 'Bearer ' + jwtToken,
    "Access-Control-Allow-Origin": "*",
  },
})

export const authApi = {
  getToken() {
    const company0Key = "35c0b3e4-50b4-4b02-8ea6-237811b6cebd"
    return axios.post("http://ec2-18-118-140-167.us-east-2.compute.amazonaws.com/api/companywidget/company-widget-auth" , {"accessKey": "35c0b3e4-50b4-4b02-8ea6-237811b6cebd"} )
      .then((response) => {
        return response
      })
  },

  getCompanyProfile() {
    const jwtToken = localStorage.getItem("Authorization")

    const headers = {
      "Authorization": "Bearer " + jwtToken,
      "Access-Control-Allow-Origin": "*",
    }

    return axiosInstance
      .get("companywidget/company-widget-info", { headers: headers })
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
      .post("car/companycars-withprice", { ...dataForm })
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

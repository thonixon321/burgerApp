
import axios from 'axios'

export const axiosHandler = {
  methods: {
    sendAxios(payLoadObj, settingsObj) {
      let axiosUrl = settingsObj.url,
          axiosMethod = settingsObj.method,
          data = payLoadObj,
          headerObj = {};

      //send request
      axios({
        method: axiosMethod,
        url: axiosUrl,
        headers: headerObj,
        data: data
      })
      .then(
        result => settingsObj.callBack(result)
      )
      .catch(
        error => console.log(error)
      )
    }
  }
}




import moment from 'moment'

export default {
  methods: {
    toDate (date = '', format = 'dddd, D MMMM YYYY, H:mm') {
      if (date) {
        moment.locale('id')
        return moment(date).format(format)
      } else {
        return ''
      }
    }
  }
}

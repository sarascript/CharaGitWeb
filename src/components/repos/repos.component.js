import { EventBus } from '../../events/events_bus';
import firebase, { firestore } from 'firebase'

class Repo {
  constructor (id, datos) {
    this.id = id
    this.name = datos.Name
    this.author = datos.Author
    this.language = datos.Language
    this.url = datos.URL
  }
}

export default {
  name: 'repos',
  components: {}, 
  props: [],
  data () {
    return {
      repos: []
    }
  },
  created: function() {

  },
  computed: {

  },
  mounted () {
    EventBus.$on('loginRegister_userStateChanged', blState => {
      //this.blLoggedUser = blState
      if (blState) {
        this.downloadRepos()
      }
    });
  },
  methods: {
    downloadRepos: function() {
      var that=this
      firebase.firestore().collection("Repos").onSnapshot(function(querySnapshot) {
        that.repos = []
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          that.repos.push(new Repo(doc.id, doc.data()))
        });
      });
    }

  }
}
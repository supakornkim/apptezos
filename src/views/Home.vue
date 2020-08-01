<template>
  <div class="home">
    <Navbar/>
    <router-view></router-view>
    {{ nodelist }}
    <!--{{ nodelist.operations['0']['0'].contents['0'].metadata.balance_updates }}-->
    <li v-for="node in nodelist">
      {{ node.kind }}
    </li>
    <!--<Footer/>-->
    {{ first }}
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';

export default {
  name: 'home',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      nodelist : [],
      count : 1,
      contents : [],
      contract_id : 'KT1GgUJwMQoFayRYNwamRAYCvHBLzgorLoGo',
      contract_storage : "",
      first : "",
      second : "",
      diff : "",
      blockb1 : "",
      blockb2 : "",
      resulf : {
        name : '',
        symbol : '',
        decimal : '',
        totalsupply : '',
        inBaker : '',
        owner : '',
        buyPrice : '',
        sellPrice : '',
      },
    }
  },
  methods:{
    getSublist: async function(head){
      //let blockid = 'BM1G7xbYxTmqWY1L84Mgjixp4ZXUcXfurYdQRC49sjWxHwEoAb3'
      //let blockid = 'head'
      let url = 'https://mainnet-node.tzscan.io/chains/main/blocks/'+head+'/header';
      //console.log(url)
      //let sess = this.$cookie.get('sess_name') + "=" + this.$cookie.get('sess_id')
      await this.axios
        .get(url,
        )
        .then(response => {
          //console.log(response.data)
          //this.nodelist = response.data;
          //this.getNode(this.nodelist.hash)
          this.blockb1 = response.data.hash
          this.blockb2 = response.data.predecessor
          this.getStorage3(this.blockb1,this.blockb2)
          this.getSublist(this.blockb2)
          //this.todo5(this.blockb1,this.blockb2)

        })
        .catch(error =>{

        });
    },
    getNode: async function(head){
      let url = 'https://mainnet-node.tzscan.io/chains/main/blocks/'+head+'/operations';
      //let sess = this.$cookie.get('sess_name') + "=" + this.$cookie.get('sess_id')
      //console.log(url)
      await this.axios
        .get(url,
        )
        .then(response => {
          //console.log(response.data.operations['0']['0'].contents['0'].metadata.balance_updates)
          //console.log(response.data.operations['0']['0'].contents)
          //console.log(response.data)
          //console.log(response.data['3']['0'].contents['0'].destination)
          if (response.data['3']['0'].contents['0'].destination == 'KT19nE2ZcXCkudXey9KTnGFgH49Hd5haDsNJ'){
            this.contents.push(response.data['3']['0'].contents['0']);
            //console.log('push' + this.contents)
            console.log(this.contents)
          }

          //if (this.count<10){
            //this.nodelist.push(response.data);
            //console.log(response.data)
            //this.nodelist.push(response.data.operations['0']['0'].contents['0'].metadata.balance_updates)
          //  this.getNode(response.data.header.predecessor)
            //this.count++
        //  }
        })
        .catch(error =>{

        });
    },

    todo: function(){
      setInterval(() => {
            console.log('call')
            this.getSublist('BM1G7xbYxTmqWY1L84Mgjixp4ZXUcXfurYdQRC49sjWxHwEoAb3');
            //console.log (this.changes);
            //console.log(this.contents)
      }, 5000);

    },
    todo2: function(){
      setInterval(() => {
            console.log('call2')
            this.getSublist('head');
            //console.log (this.changes);
            //console.log(this.contents)
      }, 5000);

    },
    getStorage : async function(contract_id){
      let url = 'https://mainnet-node.tzscan.io/chains/main/blocks/head/context/contracts/'+contract_id+'/storage';
      await this.axios
        .get(url,'')
        .then(response => {
          console.log(JSON.stringify(response.data))
          if (this.contract_storage == JSON.stringify(response.data)){
            console.log('same')
          }else{
            console.log('changed')
          }
          this.contract_storage = JSON.stringify(response.data)

        })
        .catch(error =>{

        });
    },
    todo3: function(){
      setInterval(() => {
            console.log('call3')
            this.getStorage(this.contract_id);
            //console.log (this.changes);
            //console.log(this.contents)
      }, 5000);

    },
    todo4: function(head){
      setInterval(() => {
            console.log('call4')
            this.getSublist(head);
            //console.log (this.changes);
            //console.log(this.contents)
      }, 5000);

    },
    getBlockContract : async function(block, contract){
      let url = 'https://mainnet-node.tzscan.io/chains/main/blocks/'+block+'/context/contracts/'+contract+'/storage';
      //console.log(url)
      await this.axios
        .get(url,'')
        .then(response => {

          this.first = response.data
        })
        .catch(error =>{

        });
    },
    getBlockContract2 : async function(block, contract){
      let url = 'https://mainnet-node.tzscan.io/chains/main/blocks/'+block+'/context/contracts/'+contract+'/storage';
      //console.log(url)
      await this.axios
        .get(url,'')
        .then(response => {

          this.second = response.data
        })
        .catch(error =>{

        });
    },
    getStorage3 : async function(block1, block2){
      //block1 = 'BLbXzwJVJscGSAmpqYTCmc8SNKixWqMxbH3pNPLPKFcEAxoUakE'
      //block2 = 'BLpNZUjE77G9ysGvu2pAGuZrTTeVkvjZJabNQYacaPiryGHnWfm'
      let contract_id = 'KT1BvVxWM6cjFuJNet4R9m64VDCN2iMvjuGE'
      await this.getBlockContract(block1, contract_id)
      await this.getBlockContract2(block2, contract_id)
      //console.log(block1, block2)
      this.diff = diff(this.first,this.second)
      //console.log(this.diff.args['1'])
      if ( typeof this.diff.args != 'undefined'){
        this.resulf['name'] = this.diff.args[1]
        this.resulf['symbol'] = this.diff.args[1].args[1].args[1].string
        this.resulf['decimal'] = this.diff.args[1].args[1].args[1].args[0]
        this.resulf['totalsupply'] = this.diff.args[1].args[1].args[1].args[1].args[0]
        this.resulf['inBaker'] = this.diff.args['1'].args['0']
        this.resulf['owner'] = this.diff.args[1].args[1].args[1].args[1].args[1].args[1].args[0]
        this.resulf['buyPrice'] = this.diff.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[1].int
        this.resulf['sellPrice'] = this.diff.args[1].args[1].args[1].args[1].args[1].args[1].args[1].args[0].int
        console.log(this.resulf)
      }
      console.log(block1, block2)
      //console.log(this.resulf)
      //console.log("test = " )
    },


  },
  computed: {

  },
  async mounted(){
    //await this.getSublist("BLbXzwJVJscGSAmpqYTCmc8SNKixWqMxbH3pNPLPKFcEAxoUakE")
    //await this.getStorage3(this.blockb1,this.blockb2)
    //this.todo3()
    //this.todo()
    //this.todo2()
    //this.todo2()
  }
}
</script>

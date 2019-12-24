var test = require('./dbOps')


async function check() {
    // var link = {
    //     "id" : "1",
    //     "url" : "yahoo.com",
    //     "description" : "Search Engine"
    // }

    // var res = await test.updateLink(link)
    // console.log(res);
    
//     var res = await test.insertLink(link)
//     resSearch = await test.searchLink(res.insertId)
//     console.log("Result:");
//     console.log(resSearch);

//    var response = await test.allLinks()
//    console.log("Check here:");
//    console.log(response);
      var res  = await test.deleteLink(1)
      console.log(res);
      
}

check()


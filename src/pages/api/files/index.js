export default function handler(req, res) {
    res.status(200)
    .json({"files": [
      {
        "id" : 1,
        "name" : "holi",
        "code" : {
          html:'<h1>Holi</h1>',
          css: 'h1{color: red;}',
          javascript: ''
        }
      },
      {
        "id" : 2,
        "name" : "pez",
        "code" : {
          html:'<h1>Soy un pez</h1>',
          css: 'h1{color: blue;}',
          javascript: ''
        }
      }]
    })
  }
const express = require("express");
const app = express();

const sequelize = require("./config/database");

const Employee = require("./models/Employee");
const Category = require("./models/Category");
const Asset = require("./models/Asset");
const Issue = require("./models/Issue");
const ReturnAsset = require("./models/Return");
const Scrap = require("./models/Scrap");


// ================= MIDDLEWARE =================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");


// ================= EMPLOYEE =================
app.get("/employees", async (req, res) => {

  const employees = await Employee.findAll();

  res.render("employees", { employees });

});

app.post("/add-employee", async (req, res) => {

  await Employee.create({

    name: req.body.name,

    status: req.body.status === "true"

  });

  res.redirect("/employees");

});

app.get("/delete-employee/:id", async (req, res) => {

  await Employee.destroy({
    where: { id: req.params.id }
  });

  res.redirect("/employees");

});

app.get("/employee/:id", async (req, res) => {

  const employee = await Employee.findByPk(req.params.id);

  res.json(employee);

});

app.post("/update-employee/:id", async (req, res) => {

  await Employee.update(

    {
      name: req.body.name,

      status: req.body.status === "true"
    },

    {
      where: { id: req.params.id }
    }

  );

  res.json({ success: true });

});


// ================= CATEGORY =================
app.get("/categories", async (req, res) => {

  const categories = await Category.findAll();

  res.render("categories", { categories });

});

app.post("/add-category", async (req, res) => {

  await Category.create({
    categoryName: req.body.categoryName
  });

  res.redirect("/categories");

});


// ================= ASSET =================
app.get("/assets", async (req, res) => {

  const assets = await Asset.findAll();

  res.render("asset", { assets });

});

app.post("/add-asset", async (req, res) => {

  try {

    const {
      assetName,
      serialNumber,
      category,
      model,
      value
    } = req.body;

    if (!assetName || !serialNumber || !category) {

      return res.send("Please fill all required fields");

    }

    await Asset.create({

      assetName,

      serialNumber,

      category,

      model: model || null,

      value: value || 0,

      status: "AVAILABLE"

    });

    res.redirect("/assets");

  } catch (err) {

    console.log(err);

    res.send("Error adding asset");

  }

});

app.get("/delete-asset/:id", async (req, res) => {

  await Asset.destroy({
    where: { id: req.params.id }
  });

  res.redirect("/assets");

});

app.get("/edit-asset/:id", async (req, res) => {

  const asset = await Asset.findByPk(req.params.id);

  res.render("edit-asset", { asset });

});

app.post("/update-asset/:id", async (req, res) => {

  await Asset.update(

    {
      assetName: req.body.assetName,

      serialNumber: req.body.serialNumber,

      category: req.body.category,

      model: req.body.model,

      value: req.body.value
    },

    {
      where: { id: req.params.id }
    }

  );

  res.redirect("/assets");

});


// ================= ISSUE =================
app.get("/issues", async (req, res) => {

  const issues = await Issue.findAll();

  const employees = await Employee.findAll({
    where: { status: true }
  });

  const assets = await Asset.findAll({
    where: { status: "AVAILABLE" }
  });

  res.render("issue", {
    issues,
    employees,
    assets
  });

});

app.post("/add-issue", async (req, res) => {

  const { employeeName, assetName } = req.body;

  await Issue.create({
    employeeName,
    assetName
  });

  await Asset.update(

    {
      status: "ISSUED"
    },

    {
      where: { assetName }
    }

  );

  res.redirect("/issues");

});


// ================= RETURN =================
app.get("/returns", async (req, res) => {

  const returns = await ReturnAsset.findAll();

  res.render("return", { returns });

});

app.post("/add-return", async (req, res) => {

  const { employeeName, assetName, reason } = req.body;

  await ReturnAsset.create({

    employeeName,

    assetName,

    reason

  });

  await Asset.update(

    {
      status: "AVAILABLE"
    },

    {
      where: { assetName }
    }

  );

  res.redirect("/returns");

});


// ================= STOCK =================
app.get("/stock", async (req, res) => {

  const assets = await Asset.findAll({

    where: {
      status: "AVAILABLE"
    }

  });

  let totalValue = 0;

  assets.forEach(a => {

    totalValue += Number(a.value || 0);

  });

  res.render("stock", {

    assets,

    totalValue

  });

});


// ================= SCRAP =================
app.get("/scrap", async (req, res) => {

  const scraps = await Scrap.findAll();

  res.render("scrap", { scraps });

});

app.post("/add-scrap", async (req, res) => {

  const { assetName, reason } = req.body;

  await Scrap.create({

    assetName,

    reason

  });

  await Asset.update(

    {
      status: "SCRAPPED"
    },

    {
      where: { assetName }
    }

  );

  res.redirect("/scrap");

});


// ================= HISTORY =================
app.get("/history", async (req, res) => {

  const assets = await Asset.findAll();

  const issues = await Issue.findAll();

  const returns = await ReturnAsset.findAll();

  const scraps = await Scrap.findAll();

  res.render("history", {

    assets,

    issues,

    returns,

    scraps

  });

});


// ================= HOME =================
app.get("/", (req, res) => {

  res.redirect("/assets");

});


// ================= SERVER =================
sequelize.sync().then(() => {

  app.listen(4000, () => {

    console.log("Server running at http://localhost:4000");

  });

}).catch(err => {

  console.log("Database Error:", err);

});
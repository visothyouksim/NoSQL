const Bear = require("../models/BearModel");

const bearRouter = require("express").Router();

// const datas = [
//     {
//         id: 1,
//         name: "Kirk",
//         type: "Ours blanc",
//     },
//     {
//         id: 2,
//         name: "Spock",
//         type: "Panda roux",
//     },
//     {
//         id: 3,
//         name: "Uhura",
//         type: "Grizzly",
//     },
//     {
//         id: 4,
//         name: "Sulu",
//         type: "Ours brun",
//     },
// ];

/* ROUTE FOR BEARS
GET ALL - Voir tout les ours
POST - Creer un ours
GET a Bear - Voir un ours par son id
PUT - Modifier un ours par son id
DELETE - Supprimer un ours par son id
*/

bearRouter.get("/all", async (req, res) => {
  // res.send(datas);
  try {
    const bears = await Bear.find();
    res.json(bears);
  } catch (error) {
    res.json({ message: "Error retrieving bears", error });
  }
});

bearRouter.post("/new", (req, res) => {
  const newBear = new Bear(req.body);
  try {
    const savedBear = newBear.save();
    res.json({ message: "Bear created", savedBear });
  } catch (error) {
    res.json({ message: "Bear not created", error });
  }
  res.json({ message: "Bear created", newBear });
});

bearRouter.get("/:id/show", async (req, res) => {
  // const bearId = parseInt(req.params.id);
  // const bearData = datas.find(bear => bear.id === bearId);

  // if (bearData) {
  //     res.send(bearData);
  // } else {
  //     res.send("Not found");
  // }

  try {
    const bear = await Bear.findOne({ _id: req.params.id });
    if (!bear) {
      res.json({ message: "Bear not found" });
    }
    res.json(bear);
  } catch (error) {
    res.json({ message: "Error retrieving bear", error });
  }
});

bearRouter.put("/:id/edit", async (req, res) => {
  //   const bearId = parseInt(req.params.id);
  //   const bearIndex = datas.findIndex((bear) => bear.id === bearId);
  //   datas[bearIndex] = {
  //     ...datas[bearIndex],
  //     name: req.body.name,
  //     type: req.body.type,
  //   };
  //   res.send("Bear updated");

  try {
    const bear = await Bear.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ message: "Bear updated", bear });
  } catch (error) {
    res.json({ message: "Error updating bear", error });
  }
});

bearRouter.delete("/:id/destroy", async (req, res) => {
  //   const bearId = parseInt(req.params.id);
  //   const bearIndex = datas.findIndex((bear) => bear.id === bearId);
  //   datas.splice(bearIndex, 1);
  //   res.send("Bear deleted");

  try {
    const deletedBear = await Bear.deleteOne({ _id: req.params.id });
    res.json({ message: "Bear deleted", deletedBear });
  } catch (error) {
    res.json({ message: "Error deleting bear", error });
  }
});

module.exports = bearRouter;

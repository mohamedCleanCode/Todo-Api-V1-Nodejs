const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No ${id}`, 404));
    }
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const document = await Model.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!document) {
      next(new ApiError(`No ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    // .populate({path: "category",select: "name",});
    if (!document) {
      return next(new ApiError(`No ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getAll = (Model, modelName) =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.body.filterObject) {
      filter = req.body.filterObject;
    }
    const documentsCount = await Model.countDocuments();
    // Build query
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCount)
      .filter()
      .search(modelName)
      .fields()
      .sort();

    // Execute Query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const document = await mongooseQuery;
    res.status(200).json({
      paginationResult,
      result: document.length,
      data: document,
    });
  });

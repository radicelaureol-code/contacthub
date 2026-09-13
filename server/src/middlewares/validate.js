function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join(', ');
      res.status(400);
      return next(new Error(message));
    }

    req.body = result.data; // body "nettoyé" (trim, types corrects)
    next();
  };
}

module.exports = validate;
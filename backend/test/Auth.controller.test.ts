import AuthController from "../src/app/Http/Controllers/Auth/Auth.controller";

jest.setTimeout(10000);

describe("AuthController static helpers", () => {
  test("sanitizeUserData removes password", () => {
    const user: any = { toObject: () => ({ password: "x", email: "a@b" }) };
    const sanitized = AuthController.sanitizeUserData(user);
    expect(sanitized.password).toBeUndefined();
    expect(sanitized.email).toBe("a@b");
  });

  test("decryptEmailFromToken returns null for invalid token", () => {
    const result = AuthController.decryptEmailFromToken("invalid.token");
    expect(result).toBeNull();
  });
});

describe("AuthController register method", () => {
  const mockUser = {
    email: "test@example.com",
    password: "password",
    confirmPassword: "password",
    firstName: "Test",
    lastName: "User",
  };

  test("returns error when passwords don't match", async () => {
    const req = {
      body: {
        ...mockUser,
        confirmPassword: "different",
      },
    } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.register(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Les mots de passe ne correspondent pas",
      400
    );
  });

  test("returns error when user already exists", async () => {
    jest.mock("../src/app/models/User", () => ({
      find: jest.fn().mockResolvedValue([{ email: mockUser.email }]),
    }));
    const req = { body: mockUser } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.register(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Cet email est déjà utilisé", 409);
  });

  test("successfully registers user and returns token", async () => {
    jest.mock("bcryptjs", () => ({
      hash: jest.fn().mockResolvedValue("hashedPassword"),
    }));
    jest.mock("../src/app/models/User", () => ({
      find: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({
        _id: "userId",
        email: mockUser.email,
        username: "test_user123",
      }),
    }));
    jest.mock("../src/utils/jwt", () => ({
      generateToken: jest.fn().mockReturnValue("mockToken"),
    }));

    const req = { body: mockUser } as any;
    const res = {
      success: jest.fn((data, status) => ({ data, status })),
    } as any;

    await AuthController.register(req, res, jest.fn());

    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({
        token: "mockToken",
      }),
      201
    );
  });
});

describe("AuthController login method", () => {
  const mockUser = {
    email: "test@example.com",
    password: "password",
    email_verified: true,
  };

  test("returns error when email not found", async () => {
    jest.mock("../src/app/models/User", () => ({
      findOne: jest.fn().mockResolvedValue(null),
    }));
    const req = {
      body: { email: "nonexistent@example.com", password: "pass" },
    } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.login(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Email ou mot de passe invalide",
      404
    );
  });

  test("returns error when email not verified", async () => {
    jest.mock("../src/app/models/User", () => ({
      findOne: jest
        .fn()
        .mockResolvedValue({ ...mockUser, email_verified: false }),
    }));
    const req = { body: mockUser } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.login(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Votre compte n'est pas vérifié. Veuillez vérifier votre email.",
      403
    );
  });

  test("returns error for invalid password", async () => {
    jest.mock("bcryptjs", () => ({
      compare: jest.fn().mockResolvedValue(false),
    }));
    jest.mock("../src/app/models/User", () => ({
      findOne: jest.fn().mockResolvedValue(mockUser),
    }));
    const req = { body: { ...mockUser, password: "wrong" } } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.login(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Email ou mot de passe invalide",
      401
    );
  });

  test("successfully logs in and returns token", async () => {
    jest.mock("bcryptjs", () => ({
      compare: jest.fn().mockResolvedValue(true),
    }));
    jest.mock("../src/app/models/User", () => ({
      findOne: jest.fn().mockResolvedValue(mockUser),
    }));
    jest.mock("../src/utils/jwt", () => ({
      generateToken: jest.fn().mockReturnValue("mockToken"),
    }));
    const req = { body: mockUser } as any;
    const res = {
      success: jest.fn((data, status) => ({ data, status })),
    } as any;
    await AuthController.login(req, res, jest.fn());
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({ token: "mockToken" }),
      200
    );
  });
});

describe("AuthController validate method", () => {
  test("returns error 400 for invalid token", async () => {
    const req = { body: { token: "invalid.token" } } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    jest.spyOn(AuthController, "decryptEmailFromToken").mockReturnValue(null);
    await AuthController.validate(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Token invalide ou ne correspond pas à votre email",
      400
    );
  });

  test("returns error 400 when token data doesn't match email", async () => {
    jest
      .spyOn(AuthController, "decryptEmailFromToken")
      .mockReturnValue("test@example.com");
    jest.mock("../src/app/models/EmailValidation", () => ({
      findOne: jest.fn().mockResolvedValue({ email: "different@example.com" }),
    }));
    const req = { body: { token: "valid.token" } } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.validate(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Token invalide ou ne correspond pas à votre email",
      400
    );
  });

  test("returns error 404 when user not found", async () => {
    jest
      .spyOn(AuthController, "decryptEmailFromToken")
      .mockReturnValue("test@example.com");
    jest.mock("../src/app/models/EmailValidation", () => ({
      findOne: jest.fn().mockResolvedValue({
        email: "test@example.com",
        token: "valid.token",
      }),
    }));
    jest.mock("../src/app/models/User", () => ({
      findOneAndUpdate: jest.fn().mockResolvedValue(null),
    }));
    const req = { body: { token: "valid.token" } } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.validate(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Utilisateur non trouvé", 404);
  });

  test("successfully validates email and returns token", async () => {
    const mockUser = {
      _id: "userId",
      email: "test@example.com",
      role: "user",
      email_verified: false,
    };
    jest
      .spyOn(AuthController, "decryptEmailFromToken")
      .mockReturnValue("test@example.com");
    jest.mock("../src/app/models/EmailValidation", () => ({
      findOne: jest.fn().mockResolvedValue({
        email: "test@example.com",
        token: "valid.token",
      }),
    }));
    jest.mock("../src/app/models/User", () => ({
      findOneAndUpdate: jest.fn().mockResolvedValue(mockUser),
    }));
    jest.mock("../src/utils/jwt", () => ({
      generateToken: jest.fn().mockReturnValue("newToken"),
    }));
    const req = { body: { token: "valid.token" } } as any;
    const res = {
      success: jest.fn((data, message, status) => ({ data, message, status })),
    } as any;
    await AuthController.validate(req, res, jest.fn());
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({ token: "newToken" }),
      "Email vérifié avec succès",
      200
    );
    const EmailValidation = require("../src/app/models/EmailValidation");
    expect(EmailValidation.deleteOne).toHaveBeenCalledWith({
      token: "valid.token",
    });
  });
});

describe("AuthController validateMessage method", () => {
  test("returns error 404 when user not found", async () => {
    const req = { body: { email: "nonexistent@example.com" } } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    jest.mock("../src/app/models/User", () => ({
      findOne: jest.fn().mockResolvedValue(null),
    }));
    await AuthController.validateMessage(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Utilisateur non trouvé", 404);
  });

  test("returns success 200 when email already verified", async () => {
    const mockUser = { email: "test@example.com", email_verified: true };
    const req = { body: { email: mockUser.email } } as any;
    const res = {
      success: jest.fn((data, message, status) => ({ data, message, status })),
    } as any;
    jest.mock("../src/app/models/User", () => ({
      findOne: jest.fn().mockResolvedValue(mockUser),
    }));
    await AuthController.validateMessage(req, res, jest.fn());
    expect(res.success).toHaveBeenCalledWith(
      null,
      "Votre compte est déjà vérifié. Vous pouvez vous connecter.",
      200
    );
  });

  test("successfully sends validation email", async () => {
    const mockUser = { email: "test@example.com", email_verified: false };
    jest.mock("../src/app/models/User", () => ({
      findOne: jest.fn().mockResolvedValue(mockUser),
    }));
    jest.mock("../src/app/mailer/auth/authValidateMail", () => ({
      validateMail: jest
        .fn()
        .mockResolvedValue({ success: true, message: "Email envoyé" }),
    }));
    const req = { body: { email: mockUser.email } } as any;
    const res = {
      success: jest.fn((data, message, status) => ({ data, message, status })),
    } as any;
    await AuthController.validateMessage(req, res, jest.fn());
    expect(res.success).toHaveBeenCalledWith(null, "Email envoyé", 200);
  });

  test("returns error 500 when validation email fails", async () => {
    const mockUser = { email: "test@example.com", email_verified: false };
    jest.mock("../src/app/models/User", () => ({
      findOne: jest.fn().mockResolvedValue(mockUser),
    }));
    jest.mock("../src/app/mailer/auth/authValidateMail", () => ({
      validateMail: jest
        .fn()
        .mockResolvedValue({ success: false, message: "Échec de l'envoi" }),
    }));
    const req = { body: { email: mockUser.email } } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.validateMessage(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith("Échec de l'envoi", 500);
  });
});

describe("AuthController reset method", () => {
  test("returns error 400 when passwords don't match", async () => {
    const req = {
      body: { password: "pass", confirmPassword: "different", token: "token" },
    } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.reset(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Les mots de passe ne correspondent pas",
      400
    );
  });

  test("returns error for invalid token", async () => {
    jest.spyOn(AuthController, "decryptEmailFromToken").mockReturnValue(null);
    const req = {
      body: { password: "pass", confirmPassword: "pass", token: "invalid" },
    } as any;
    const res = {
      error: jest.fn((message, status) => ({ message, status })),
    } as any;
    await AuthController.reset(req, res, jest.fn());
    expect(res.error).toHaveBeenCalledWith(
      "Token invalide ou ne correspond pas à votre email",
      400
    );
  });

  test("successfully resets password", async () => {
    const mockUser = { email: "test@example.com", email_verified: true };
    jest
      .spyOn(AuthController, "decryptEmailFromToken")
      .mockReturnValue(mockUser.email);
    jest.mock("../src/app/models/PasswordReset", () => ({
      findOne: jest
        .fn()
        .mockResolvedValue({ email: mockUser.email, token: "validToken" }),
    }));
    jest.mock("bcryptjs", () => ({
      hash: jest.fn().mockResolvedValue("hashedPassword"),
    }));
    jest.mock("../src/app/models/User", () => ({
      findOneAndUpdate: jest.fn().mockResolvedValue(mockUser),
    }));
    const req = {
      body: {
        password: "newPass",
        confirmPassword: "newPass",
        token: "validToken",
      },
    } as any;
    const res = {
      success: jest.fn((data, message, status) => ({ data, message, status })),
    } as any;
    await AuthController.reset(req, res, jest.fn());
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({ user: mockUser }),
      "Mot de passe réinitialisé avec succès",
      200
    );
  });
});

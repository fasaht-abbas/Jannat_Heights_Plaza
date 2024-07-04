"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CNICRegex = exports.fileRegex = exports.phoneRegex = exports.nameRegex = exports.passRegex = exports.emailRegex = void 0;
exports.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.passRegex = /^(?=.*[a-zA-Z])(?=.*\d).*$/;
exports.nameRegex = /^[a-zA-Z\s]+$/;
exports.phoneRegex = /^\d{8,}$/;
exports.fileRegex = /(?:\.([^.]+))?$/;
exports.CNICRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

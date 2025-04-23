-- The tutees table
-- 2. Create the tutor table
CREATE TABLE "Tutors" (
    "id" SERIAL PRIMARY KEY,
      "user_id" UUID NOT NULL UNIQUE
    REFERENCES "Users"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    "fullName" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "phone" TEXT,
    "currentRole" TEXT,
    "subjects" TEXT[],  -- Array of subjects
    "priorTeachingExperience" BOOLEAN,
    "experienceDetails" TEXT,
    "tutoringFormat" TEXT,
    "availability" TEXT,
    "educationalBackground" TEXT,
    "referral" TEXT,
 "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

-- Enable the pgcrypto extension to use gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the 'Users' table with a CHECK constraint for the 'role' column
CREATE TABLE IF NOT EXISTS "Users" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255),
    phone_number VARCHAR(50),
    role TEXT NOT NULL CHECK (role IN (
        'student',
        'tutor',
        'tutee',
        'mentor',
        'mentee',
        'admin',
        'administrator'
    )),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Donation table 
CREATE TABLE "Donations" (
  id SERIAL PRIMARY KEY,
  "amount" FLOAT NOT NULL,
  "paymentMethod" VARCHAR(255) NOT NULL,
  "transactionId" VARCHAR(255) UNIQUE,
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(255) NOT NULL,
  "address" VARCHAR(255) NOT NULL,
  "address2" VARCHAR(255),
 "city" VARCHAR(255) NOT NULL,
  "state" VARCHAR(255) NOT NULL,
  "zip" VARCHAR(255) NOT NULL,
  "country" VARCHAR(255) NOT NULL,
  "giftType" VARCHAR(20) NOT NULL CHECK ("giftType" IN ('one-time', 'monthly')),
  "status" VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'failed')),
  "emailSent" BOOLEAN NOT NULL DEFAULT false,
  "receiptNumber" VARCHAR(255) UNIQUE,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

-- Sesssions table
CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "tutor_id" INTEGER NOT NULL,
  "tutee_id" INTEGER,
  "date" DATE NOT NULL,
  "time" TIME NOT NULL,
  "duration" INTEGER NOT NULL,
  "topic" TEXT NOT NULL,
  "status" VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'approved', 'denied')),
  "resource_id" INTEGER,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




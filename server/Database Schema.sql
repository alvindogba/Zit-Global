-- The tutees table
-- enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- create Tutees table with camelCase columns
CREATE TABLE "Tutees" (
  "id" UUID PRIMARY KEY
    DEFAULT gen_random_uuid(),

  "user_id" UUID NOT NULL UNIQUE
    REFERENCES "Users"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  "fullName"      VARCHAR(255) NOT NULL,
  "dob"           DATE          NOT NULL,
  "email"         VARCHAR(255) NOT NULL UNIQUE,
  "phone"         VARCHAR(50),
  "gender"        VARCHAR(50)   NOT NULL,
  "schoolName"    VARCHAR(255)  NOT NULL,
  "gradeLevel"    VARCHAR(50)   NOT NULL,
  "subjects"      TEXT[],

  "learningStyle" VARCHAR(100)  NOT NULL,
  "tutoringNeeds" TEXT          NOT NULL,
  "objectives"    TEXT,
  "availability"  VARCHAR(50)   NOT NULL,
  "tutorType"     VARCHAR(100)  NOT NULL,
  "referral"      VARCHAR(255),

  "createdAt" TIMESTAMP WITH TIME ZONE
    DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE
    DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the tutor table
CREATE TABLE "Tutors" (
    "id" UUID PRIMARY KEY,
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
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255),
    phone_number VARCHAR(50),
    role TEXT NOT NULL CHECK (role IN (
        'student',
        'tutor',
        'tutee',
        'mentor',
        'mentee',
        'parent',
        'admin',
        'administrator',
        'teacher'
    )),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create the Admin Table 
CREATE TABLE IF NOT EXISTS "Admin"(
  "id" UUID PRIMARY KEY
  DEFAULT gen_random_uuid(),

  "user_id" UUID NOT NULL UNIQUE
  REFERENCES "Users"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  "fullName"           TEXT    NOT NULL,
  "email"              TEXT    NOT NULL,
  "phone"              TEXT    NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL
    DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
    DEFAULT CURRENT_TIMESTAMP
);


-- 2. Create the Parents table with camel-case columns
CREATE TABLE "Parents" (
  "id" UUID PRIMARY KEY
    DEFAULT gen_random_uuid(),

  "user_id" UUID NOT NULL UNIQUE
    REFERENCES "Users"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  "fullName"           TEXT    NOT NULL,
  "email"              TEXT    NOT NULL,
  "phone"              TEXT    NOT NULL,
  "relationToStudent"  TEXT    NOT NULL,
  "studentName"        TEXT    NOT NULL,
  "studentAge"         TEXT    NOT NULL,
  "schoolName"         TEXT    NOT NULL,
  "gradeLevel"         TEXT    NOT NULL,
  "subjects"           TEXT[],         -- array of subjects
  "tutoringStyle"      TEXT    NOT NULL,
  "learningGoals"      TEXT    NOT NULL,
  "availability"       TEXT    NOT NULL,
  "comments"           TEXT,
  "referral"           TEXT,

  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL
    DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
    DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the SchoolAdmin table
CREATE TABLE "SchoolAdmins" (
  "id" UUID PRIMARY KEY
    DEFAULT gen_random_uuid(),

  "user_id" UUID NOT NULL UNIQUE
    REFERENCES "Users"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  "fullName"          TEXT    NOT NULL,
  "email"             TEXT    NOT NULL,
  "phone"             TEXT    NOT NULL,
  "schoolName"        TEXT    NOT NULL,
  "schoolLocation"    TEXT    NOT NULL,
  "services"          TEXT[],       -- array of service offerings
  "gradeLevels"       TEXT    NOT NULL,
  "supportMode"       TEXT    NOT NULL,
  "challenges"        TEXT    NOT NULL,
  "contactMethod"     TEXT    NOT NULL,
  "bestTime"          TEXT    NOT NULL,
  "additionalComments" TEXT,
  "referral"          TEXT,

  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL
    DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
    DEFAULT CURRENT_TIMESTAMP
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


-- The Admission table -- First, create the enum type for the status column
CREATE TYPE admission_status AS ENUM ('pending', 'under_review', 'interview_scheduled', 'accepted', 'rejected');

-- Then, create the Admissions table
CREATE TABLE "Admissions" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID UNIQUE NOT NULL,
  "applicationNumber" VARCHAR UNIQUE,
  "firstName" VARCHAR NOT NULL,
  "lastName" VARCHAR NOT NULL,
  "dateOfBirth" DATE NOT NULL,
  "gender" VARCHAR,
  "identificationType" VARCHAR NOT NULL,
  "identificationNumber" VARCHAR NOT NULL,
  "nationality" VARCHAR NOT NULL,
  "haveComputer" BOOLEAN NOT NULL,
  "desiredProgram" VARCHAR NOT NULL,
  "academicYear" VARCHAR,
  "educationLevel" VARCHAR,
  "yearOfGraduation" VARCHAR,
  "lastSchoolAttended" VARCHAR,
  "computerKnowledge" VARCHAR,
  "personalStatement" TEXT,
  "communityImpact" TEXT,
  "email" VARCHAR NOT NULL,
  "phone" VARCHAR NOT NULL,
  "address" VARCHAR NOT NULL,
  "emergencyContactName" VARCHAR NOT NULL,
  "emergencyPersonAddress" VARCHAR NOT NULL,
  "emergencyContactNumber" VARCHAR NOT NULL,
  "relationshipType" VARCHAR NOT NULL,
  "consented" BOOLEAN NOT NULL,
  "applicantImage" VARCHAR,
  "churchRecommendationLetter" VARCHAR,
  "communityRecommendationLetter" VARCHAR,
  "status" admission_status DEFAULT 'pending',
  "interviewDate" DATE,
  "interviewLocation" VARCHAR,
  "admissionDecisionDate" DATE,
  "lastNotificationSent" DATE,
  "notificationHistory" JSON DEFAULT '[]',
  "notes" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- The Teacher table 
CREATE TABLE "Teachers"(
   "id" UUID PRIMARY KEY
    DEFAULT gen_random_uuid(),

  "user_id" UUID NOT NULL UNIQUE
    REFERENCES "Users"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE,

      "fullName"           TEXT    NOT NULL,
      "dob"                 DATE ,
      "email"             TEXT    NOT NULL,
      "phone"             TEXT    NOT NULL,
      "gender"             TEXT,
      "educationLevel"             TEXT    NOT NULL,
      "teachingExperience"             TEXT    NOT NULL,
      "subjects"             TEXT[],
      "teachingStyle"             TEXT    NOT NULL,
      "teachingPhilosophy"             TEXT    NOT NULL,
      "objectives"             TEXT    NOT NULL,
      "availability"             TEXT ,
      "preferredLevel"             TEXT,
      "referral"             TEXT ,
"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL
    DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
    DEFAULT CURRENT_TIMESTAMP
);

-- The Mentor Table 
CREATE TABLE "Mentors" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "fullName" VARCHAR(255) NOT NULL,
  "user_id" UUID NOT NULL UNIQUE,
  "email" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(255) NOT NULL,
  "profession" VARCHAR(255) NOT NULL,
  "mentorshipAreas" TEXT[], -- ARRAY of strings
  "priorExperience" VARCHAR(255) NOT NULL,
  "experienceDetails" TEXT,
  "mentorshipFormat" VARCHAR(255) NOT NULL,
  "availability" VARCHAR(255) NOT NULL,
  "motivation" TEXT,
  "referral" VARCHAR(255),
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  FOREIGN KEY ("user_id") REFERENCES "Users" (id) ON DELETE CASCADE
);


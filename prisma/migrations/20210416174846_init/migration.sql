-- CreateTable
CREATE TABLE "annee_classes" (
    "idAnnee" TEXT NOT NULL PRIMARY KEY,
    "valeurBarre" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "classes" (
    "idClasse" TEXT NOT NULL PRIMARY KEY,
    "nomClasse" TEXT NOT NULL,
    "idAnnee" TEXT NOT NULL,
    FOREIGN KEY ("idAnnee") REFERENCES "annee_classes" ("idAnnee") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "eleves" (
    "idEleve" TEXT NOT NULL PRIMARY KEY,
    "idClasse" TEXT,
    "idProfesseur" TEXT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "login" TEXT,
    "password" TEXT,
    FOREIGN KEY ("idClasse") REFERENCES "classes" ("idClasse") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("idProfesseur") REFERENCES "professeurs" ("idProfesseur") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "professeurs" (
    "idProfesseur" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "login" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "resultats_toeic" (
    "idResultatToeic" TEXT NOT NULL PRIMARY KEY,
    "idEleve" TEXT NOT NULL,
    "numToeic" TEXT NOT NULL,
    "scorePart1" INTEGER,
    "scorePart2" INTEGER,
    "scorePart3" INTEGER,
    "scorePart4" INTEGER,
    "scorePart5" INTEGER,
    "scorePart6" INTEGER,
    "scorePart7" INTEGER,
    FOREIGN KEY ("idEleve") REFERENCES "eleves" ("idEleve") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("numToeic") REFERENCES "toeics" ("idToeic") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "toeics" (
    "idToeic" TEXT NOT NULL PRIMARY KEY,
    "idProfesseur" TEXT NOT NULL,
    "idClasse" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "officiel" BOOLEAN NOT NULL,
    FOREIGN KEY ("idProfesseur") REFERENCES "professeurs" ("idProfesseur") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("idClasse") REFERENCES "classes" ("idClasse") ON DELETE CASCADE ON UPDATE CASCADE
);

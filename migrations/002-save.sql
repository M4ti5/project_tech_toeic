
-- UP


CREATE TABLE  `annee_classes` (
  `idAnnee` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `idClasse` INTEGER NOT NULL,
  `idBarre` INTEGER NOT NULL,
  FOREIGN KEY (`idClasse`) REFERENCES `classes`(`idClasse`),
  FOREIGN KEY (`idBarre`) REFERENCES `barres_de_passage`(`idBarre`)
);

CREATE TABLE `barres_de_passage` (
  `idBarre` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `idAnnee` INTEGER NOT NULL,
  `valeurBarre` INTEGER NOT NULL,
  FOREIGN KEY (`idAnnee`) REFERENCES `annee_classes`(`idAnnee`)
);

CREATE TABLE `classes` (
  `idClasse` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `nomClasse` varchar(25) NOT NULL
);

CREATE TABLE `eleves` (
  `idEleve` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `idClasse` INTEGER,
  `idGroupe` INTEGER ,
  `idProfesseur` INTEGER,
  `Nom` varchar(30) NOT NULL,
  `Prenom` varchar(30) NOT NULL,
  `login` varchar(50),
  `password` varchar(25),
  FOREIGN KEY (`idClasse`) REFERENCES `classes`(`idClasse`),
  FOREIGN KEY (`idGroupe`) REFERENCES `groupes`(`idGroupe`),
  FOREIGN KEY (`idProfesseur`) REFERENCES `professeurs`(`idProfesseur`)
);

CREATE TABLE `groupes` (
  `idGroupe` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `idProfesseur` INTEGER NOT NULL,
  FOREIGN KEY (`idProfesseur`) REFERENCES `professeurs`(`idProfesseur`)
);

CREATE TABLE `professeurs` (
  `idProfesseur` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(25) NOT NULL
);

CREATE TABLE `resultats_toeic` (
  `idResultatToeic` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `idEleve` INTEGER NOT NULL,
  `numToeic` INTEGER NOT NULL,
  `scorePart1` INTEGER,
  `scorePart2` INTEGER,
  `scorePart3` INTEGER,
  `scorePart4` INTEGER,
  `scorePart5` INTEGER,
  `scorePart6` INTEGER,
  `scorePart7` INTEGER,
  FOREIGN KEY (`idEleve`) REFERENCES `eleves`(`idEleve`),
  FOREIGN KEY (`numToeic`) REFERENCES `toeic`(`idToeic`)
);

CREATE TABLE `toeic` (
  `idToeic` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `date` date NOT NULL
);

INSERT INTO `annee_classes` (`idAnnee`, `idClasse`, `idBarre`) VALUES
(1, 11, 1),
(2, 12, 1),
(3, 13, 1),
(4, 21, 2),
(5, 22, 2),
(6, 23, 2),
(7, 31, 3),
(8, 32, 3),
(9, 33, 3);


INSERT INTO `barres_de_passage` (`idBarre`, `idAnnee`, `valeurBarre`) VALUES
(1, 1, 585),
(2, 2, 685),
(3, 3, 785);


INSERT INTO `classes` (`idClasse`, `nomClasse`) VALUES
(11, 'ING1 Calais'),
(12, 'ING1 St-Omer'),
(13, 'ING1 Dunkerque'),
(21, 'ING2 Calais'),
(22, 'ING2 St-Omer'),
(23, 'ING2 Dunkerque'),
(31, 'ING3 Calais '),
(32, 'ING3 St-Omer'),
(33, 'ING3 Dunkerque');


INSERT INTO `eleves` (`idEleve`, `idClasse`, `idGroupe`, `idProfesseur`, `Nom`, `Prenom`, `login`, `password`) VALUES
(2, 21, 1, 1, 'Caffiaux', 'Matis', 'matcaf', '1307'),
(3, 21, 2, 2, 'Bonnet', 'Quentin', 'quebon', '0602'),
(4, 21, 1, 1, 'Louard', 'Abir', 'louabi', '1506'),
(1, 21, 3, 3, 'Uyttersprot', 'Valentin', 'valuyt', '2001');


INSERT INTO `groupes` (`idGroupe`, `idProfesseur`) VALUES
(1, 1),
(2, 2),
(3, 3);


INSERT INTO `professeurs` (`idProfesseur`, `nom`, `prenom`, `login`, `password`) VALUES
(1, 'Cicharski', 'Katherine', 'katcic', '1234'),
(2, 'Fortuni', 'Gino', 'forgin', '1234'),
(3, 'Podvin', 'Aurelien', 'podaur', '1234');



INSERT INTO `resultats_toeic` (`idResultatToeic`, `idEleve`, `numToeic`, `scorePart1`, `scorePart2`, `scorePart3`, `scorePart4`, `scorePart5`, `scorePart6`, `scorePart7`) VALUES
(1, 1, 1, 5, 20, 36, 25, 29, 15, 46),
(2, 2, 2, 6, 24, 30, 29, 25, 13, 50);


INSERT INTO `toeic` (`idToeic`,`date`) VALUES
(1, '2021-02-02'),
(2, '2021-03-02');


-- DOWN
DROP TABLE `annee_classes`;
DROP TABLE `barres_de_passage`;
DROP TABLE `classes`;
DROP TABLE `eleves`;
DROP TABLE `groupes`;
DROP TABLE `professeurs`;
DROP TABLE `resultats_toeic`;
DROP TABLE `toeic`;

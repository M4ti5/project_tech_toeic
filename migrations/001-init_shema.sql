
-- UP


CREATE TABLE `annee_classes` (
  `idAnnee` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `idClasse` INTEGER NOT NULL,
  `idBarre` INTEGER NOT NULL
);

CREATE TABLE `barres_de_passage` (
  `idBarre` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `idAnnee` INTEGER NOT NULL,
  `valeurBarre` INTEGER NOT NULL
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
  `password` varchar(25) 
);

CREATE TABLE `groupes` (
  `idGroupe` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `idProfesseur` INTEGER NOT NULL
);

CREATE TABLE `professeurs` (
  `idProfesseur` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(25) NOT NULL
);

CREATE TABLE `resultats_toeic` (
  `idToeic` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `idEleve` INTEGER NOT NULL,
  `date` date NOT NULL,
  `scorePart1` INTEGER NOT NULL,
  `scorePart2` INTEGER NOT NULL,
  `scorePart3` INTEGER NOT NULL,
  `scorePart4` INTEGER NOT NULL,
  `scorePart5` INTEGER NOT NULL,
  `scorePart6` INTEGER NOT NULL,
  `scorePart7` INTEGER NOT NULL
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



INSERT INTO `resultats_toeic` (`idToeic`, `idEleve`, `date`, `scorePart1`, `scorePart2`, `scorePart3`, `scorePart4`, `scorePart5`, `scorePart6`, `scorePart7`) VALUES
(1, 1, '2021-02-02', 10, 100, 80, 90, 150, 90, 80),
(2, 2, '2021-03-02', 50, 200, 150, 95, 160, 120, 110);


-- DOWN

DROP TABLE `annee_classes`; 
DROP TABLE `barres_de_passage`; 
DROP TABLE `classes`; 
DROP TABLE `eleves`; 
DROP TABLE `groupes`; 
DROP TABLE `professeurs`; 
DROP TABLE `resultats_toeic`; 

create table IF NOT EXISTS usuario (
    idUsuario bigserial constraint pk_usuario PRIMARY KEY,
    loginUsuario varchar(10) UNIQUE,
    senhaUsuario text,
    removidoUsuario boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuario values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'teste', crypt('teste', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;

-- Criação da tabela Curso
CREATE TABLE Curso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    dataabertura DATE NOT NULL,
    cargahoraria INT NOT NULL,
    removido BOOLEAN DEFAULT FALSE
);

-- Criação da tabela Disciplina
CREATE TABLE Disciplina (
    idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    cargahoraria INT NOT NULL,
    dataabertura DATE NOT NULL,
    removido BOOLEAN DEFAULT FALSE,
    idCurso INT NOT NULL,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);

-- Criação da tabela Aluno
CREATE TABLE Aluno (
    idAluno INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    dataNasc DATE NOT NULL,
    renda DECIMAL(10, 2),
    documento VARCHAR(20) UNIQUE NOT NULL,
    removido BOOLEAN DEFAULT FALSE
);

-- Criação da tabela DisciplinaAluno (Matrícula)
CREATE TABLE DisciplinaAluno (
    idDisciplinaAluno INT PRIMARY KEY AUTO_INCREMENT,
    datamatricula DATE NOT NULL,
    idAluno INT NOT NULL,
    idDisciplina INT NOT NULL,
    FOREIGN KEY (idAluno) REFERENCES Aluno(idAluno),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina)
);
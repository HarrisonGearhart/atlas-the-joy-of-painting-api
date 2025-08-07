-- ========================================
-- Joy of Painting Database Initialization
-- ========================================

DROP TABLE IF EXISTS episode_colors;
DROP TABLE IF EXISTS episode_subjects;
DROP TABLE IF EXISTS colors;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS episodes;

-- ========================
-- Base Tables Definitions
-- ========================

-- Table to store core episode information
CREATE TABLE episodes (
    episode_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    air_date DATE
);

-- Table to store distinct paint colors used across episodes
CREATE TABLE colors (
    color_id SERIAL PRIMARY KEY,
    color_name TEXT UNIQUE NOT NULL
);

-- Table to store distinct subject matters painted in episodes
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name TEXT UNIQUE NOT NULL
);

-- ===================================
-- Junction Tables for Many-to-Many
-- ===================================

-- Associates episodes with one or more subjects (e.g. 'Mountain', 'Cabin')
CREATE TABLE episode_subjects (
    episode_id INT NOT NULL,
    subject_id INT NOT NULL,
    PRIMARY KEY (episode_id, subject_id),
    FOREIGN KEY (episode_id) REFERENCES episodes(episode_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
);

-- Associates episodes with one or more colors used
CREATE TABLE episode_colors (
    episode_id INT NOT NULL,
    color_id INT NOT NULL,
    PRIMARY KEY (episode_id, color_id),
    FOREIGN KEY (episode_id) REFERENCES episodes(episode_id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES colors(color_id) ON DELETE CASCADE
);

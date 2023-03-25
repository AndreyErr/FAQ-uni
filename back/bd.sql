-- Database: FAQ

-- DROP DATABASE IF EXISTS "FAQ";

CREATE DATABASE "FAQ"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.Faq

-- DROP TABLE IF EXISTS public."Faq";

CREATE TABLE IF NOT EXISTS public."Faq"
(
    "faqId" integer NOT NULL DEFAULT 'nextval('"Faq_faqId_seq"'::regclass)',
    "userAdd" integer NOT NULL,
    "userCheck" integer,
    type integer NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    qwest text[] COLLATE pg_catalog."default" NOT NULL,
    ans text[] COLLATE pg_catalog."default" NOT NULL,
    likes integer,
    "disLikes" integer,
    atr integer,
    CONSTRAINT "Faq_pkey" PRIMARY KEY ("faqId")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Faq"
    OWNER to postgres;

-- Table: public.FaqType

-- DROP TABLE IF EXISTS public."FaqType";

CREATE TABLE IF NOT EXISTS public."FaqType"
(
    "FaqTypeId" integer NOT NULL DEFAULT 'nextval('"FaqType_FaqTypeId_seq"'::regclass)',
    title "char"[] NOT NULL,
    CONSTRAINT "FaqType_pkey" PRIMARY KEY ("FaqTypeId")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."FaqType"
    OWNER to postgres;

-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    "userId" integer NOT NULL DEFAULT 'nextval('"Users_userId_seq"'::regclass)',
    login "char"[] NOT NULL,
    email "char"[] NOT NULL,
    pass "char"[] NOT NULL,
    status integer NOT NULL DEFAULT 0,
    atr integer,
    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;

-- Table: public.dialogEXAMPLE

-- DROP TABLE IF EXISTS public."dialogEXAMPLE";

CREATE TABLE IF NOT EXISTS public."dialogEXAMPLE"
(
    "messageId" integer NOT NULL DEFAULT 'nextval('"dialogEXAMPLE_messageId_seq"'::regclass)',
    message text[] COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    CONSTRAINT "dialogEXAMPLE_pkey" PRIMARY KEY ("messageId")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."dialogEXAMPLE"
    OWNER to postgres;

-- Table: public.dialogs

-- DROP TABLE IF EXISTS public.dialogs;

CREATE TABLE IF NOT EXISTS public.dialogs
(
    "UniqueID" integer NOT NULL DEFAULT 'nextval('"dialogs_UniqueID_seq"'::regclass)',
    user1 integer NOT NULL,
    user2 integer NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    type integer NOT NULL DEFAULT 0,
    atr integer,
    CONSTRAINT dialogs_pkey PRIMARY KEY ("UniqueID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.dialogs
    OWNER to postgres;

-- Table: public.usersStatus

-- DROP TABLE IF EXISTS public."usersStatus";

CREATE TABLE IF NOT EXISTS public."usersStatus"
(
    "usersStatusId" integer NOT NULL DEFAULT 'nextval('"usersStatus_usersStatusId_seq"'::regclass)',
    title "char"[] NOT NULL,
    CONSTRAINT "usersStatus_pkey" PRIMARY KEY ("usersStatusId")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."usersStatus"
    OWNER to postgres;
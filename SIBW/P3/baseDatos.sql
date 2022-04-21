-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 20-04-2022 a las 23:57:50
-- Versión del servidor: 8.0.28
-- Versión de PHP: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `docker`
--
CREATE DATABASE IF NOT EXISTS `docker` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `docker`;
--
-- Base de datos: `fruity_db`
--
CREATE DATABASE IF NOT EXISTS `fruity_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `fruity_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int NOT NULL,
  `autor` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cuerpo` mediumtext NOT NULL,
  `id_producto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `autor`, `fecha`, `cuerpo`, `id_producto`) VALUES
(1, 'Elena Torres', '2022-03-15 07:28:56', '¡Me encantan los plátanos! Muy recomendable en cualquier época del año. ', 1),
(2, 'Fernando Torrijas', '2022-03-01 20:18:56', 'El plátano está bien, pero nada como una buena sandía fresquita.', 1),
(3, 'Mónica Luque', '2022-04-17 18:46:48', 'Ugh! El limón es demasiado agrio.', 2),
(4, 'Jose Vicente Sola ', '2022-04-11 15:22:33', 'Siempre está bueno un poquito de limón con la cerveza jejeje. Un saludo gente.', 2),
(5, 'Matilde Jara ', '2022-03-25 12:22:33', 'Ummm que rico el kiwi! Ideal para la digestión.', 3),
(6, 'Mariano Delgado', '2022-02-23 10:22:33', 'No me libro del kiwi ni en navidad', 3),
(7, 'Thomas Felipe', '2022-04-17 18:46:48', 'Que rico el zumo de naranja, muy recomendable para desayunar!', 4),
(8, 'Guillermina Valdivia', '2022-04-06 20:22:33', 'Siempre me ha gustado el zumo de naranja pero la fruta en sí se me hace muy pesada. ', 4),
(9, 'Cristina Echevarria', '2022-04-17 18:46:48', 'Me encanta la sandía fresca en verano. Me acuerdo de pequeña que mi familia siempre la dejaba en la orilla de la playa para que se mantenga fría. Una pena vivir en un sitio sin playa ahora :(', 5),
(10, 'Luz-Maria Cuesta', '2022-03-23 13:22:33', 'Yo siempre he sido más de melon jejeje.', 5),
(11, 'Cayetana Moreira', '2022-04-17 18:46:48', 'Que rica la piña ( ͡° ͜ʖ ͡°)', 6),
(12, 'Enriqueta Angulo', '2022-04-04 20:22:33', 'Siempre zumito de piña para acompañar el almuerzo!', 6),
(13, 'Joaquin Josue', '2022-04-17 04:20:33', '¡Cómo me encanta Granada, es preciosa!', 7),
(14, 'Joaquin Josue', '2022-04-17 04:22:14', 'Me acabo de dar cuenta de que es la fruta y no la ciudad jeje. Menuda llevo puesta.', 7),
(15, 'Amelia Sole', '2022-04-17 18:46:48', 'Siempre he sido muy fan de la berenjena frita', 8),
(16, 'Maria-Jose Coca', '2022-04-17 11:39:22', 'La berenjena está sobrevalorada.', 8),
(17, 'Claudia Rovira', '2022-04-17 18:46:48', 'Muy recomendable la fruta del dragón para recetas real-food.', 9),
(18, 'Oscar Narvaez', '2022-04-14 20:22:33', 'Nunca he visto esta fruta, ¡habrá que probarla! (aunque es cara eso sí)', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `pie` varchar(100) NOT NULL,
  `id_producto` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `ruta`, `pie`, `id_producto`) VALUES
(1, 'static/img/fruits/banana.png', 'Plátano 1', 1),
(2, 'static/img/fruits/banana.png', 'Plátano 2', 1),
(3, 'static/img/fruits/lemon.png', 'Limón 1', 2),
(4, 'static/img/fruits/lemon.png', 'Limón 2', 2),
(5, 'static/img/fruits/kiwi.png', 'Kiwi 1', 3),
(6, 'static/img/fruits/kiwi.png', 'Kiwi 2', 3),
(7, 'static/img/fruits/orange.png', 'Naranja 1', 4),
(8, 'static/img/fruits/orange.png', 'Naranja 2', 4),
(9, 'static/img/fruits/watermelon.png', 'Sandía 1', 5),
(10, 'static/img/fruits/watermelon.png', 'Sandía 2', 5),
(11, 'static/img/fruits/pineapple.png', 'Piña 1', 6),
(12, 'static/img/fruits/pineapple.png', 'Piña 2', 6),
(13, 'static/img/fruits/pomegranate.png', 'Granada 1', 7),
(14, 'static/img/fruits/pomegranate.png', 'Granada 2', 7),
(15, 'static/img/fruits/aubergine.png', 'Berenjena 1', 8),
(16, 'static/img/fruits/aubergine.png', 'Berenjena 2', 8),
(17, 'static/img/fruits/dragon-fruit.png', 'Fruta del Dragón 1', 9),
(18, 'static/img/fruits/dragon-fruit.png', 'Fruta del Dragón 2', 9),
(19, 'static/img/fruits/plum.png', 'Ciruela 1', 10),
(20, 'static/img/fruits/plum.png', 'Ciruela 2', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `malsonantes`
--

CREATE TABLE `malsonantes` (
  `id` int NOT NULL,
  `palabra` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `malsonantes`
--

INSERT INTO `malsonantes` (`id`, `palabra`) VALUES
(1, 'pene'),
(2, 'puta'),
(3, 'puto'),
(4, 'polla'),
(5, 'estupido'),
(6, 'tonto'),
(7, 'mierda'),
(8, 'coño'),
(9, 'follar'),
(10, 'cojon'),
(11, 'cabron'),
(12, 'capullo'),
(13, 'cipote');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id`, `nombre`) VALUES
(1, 'FreshProducts'),
(2, 'Paco el Melón'),
(3, 'Frutas y verduras Ginés');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `icono` varchar(255) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `descripcion` mediumtext,
  `id_marca` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `icono`, `precio`, `descripcion`, `id_marca`) VALUES
(1, 'Plátano', 'static/img/fruits/banana.png', '4.00', 'La banana, conocido también como banano, plátano, guineo maduro, guineo, cambur o gualele, es un fruto comestible, de varios tipos de grandes plantas herbáceas del género Musa. A estas plantas de gran porte que tienen aspecto de arbolillo se las denomina plataneras, bananeros, bananeras, plátanos o bananos.​\r\n\r\nEs un fruto con cualidades variables en tamaño, color y firmeza, alargado, generalmente curvado y carnoso, rico en almidón cubierto con una cáscara, que puede ser verde, amarilla, roja, púrpura o marrón cuando está madura. Los frutos crecen en piñas que cuelgan de la parte superior de la planta. Casi todos los plátanos en la actualidad son frutos estériles que no producen semillas fructificantes y provienen de dos especies silvestres: Musa acuminata y Musa balbisiana. El nombre científico de la mayoría de los plátanos cultivados es Musa × paradisiaca, el híbrido Musa acuminata × M. balbisiana, con distintas denominaciones var. o cultivares, dependiendo de su constitución genómica.\r\n\r\nLos plátanos, de los que se conocen más de 1000 variedades, proporcionan alimento a grandes poblaciones humanas en dos formas principales:\r\n\r\n    Plátanos de postre o dulces, para comer principalmente crudos, con gran parte de su fécula convertida en azúcar, destacando la variedad cavendish, que representa aproximadamente el 47% de la producción mundial.\r\n    Plátanos de cocinar o de guisar, más grandes, se comen cocinados de formas diversas, con diferentes variedades como el plátano macho o el pisang awak en Asia. Se suelen consumir hervidos, asados o fritos, independientemente de si están maduros o no.', 1),
(2, 'Limón', 'static/img/fruits/lemon.png', '1.79', 'El limón es redondo y ligeramente alargado, pertenece a la familia de los agrios y por tanto comparte muchas de las características de otras especies de cítricos, como es tener una piel gruesa. La pulpa es color amarillo pálido, jugosa y de sabor ácido dividida en gajos. El color de la corteza es amarillo y especialmente brillante cuando está maduro.\r\n\r\nSe utiliza en fresco para usos culinarios, y su zumo en la industria de preparados alimenticios. Para la industria farmacéutica es materia prima para la fabricación de numerosos medicamentos, y en casa se puede utilizar para numerosos remedios caseros.\r\n\r\nEl limón posee numerosas propiedades: refuerza el sistema inmunológico, es revitalizante, activa el metabolismo del calcio para los huesos y dientes, curan las hemorragias, tiene acción rejuvenecedora y ayuda en las dietas de adelgazamiento. Sin embargo por ser un fruto muy enérgico debe evitarse darlo a ancianos y a personas en estado de fuerte nerviosismo.', 1),
(3, 'Kiwi', 'static/img/fruits/kiwi.png', '3.00', 'El kiwi es un fruto de forma ovoide, de tamaño variable y recubierto de una piel fina de color marrón, ligeramente vellosa. Puede tener de 4 a 7,5cm de longitud por 3,5 a 5cm de anchura y el peso varía de 30-150g en función de la variedad, las condiciones climáticas y del sistema de cultivo. La pulpa puede ser de color verde de distinta tonalidad según la variedad, tierna, jugosa y de sabor agridulce. Presenta numerosas y pequeñas semillas negras comestibles. El color de la pulpa y el sabor delicado de la misma que recuerda en parte a la uva, a la fresa y a la piña, lo hacen muy agradable.\r\n\r\nDiversas investigaciones científicas indican que el kiwi es una destacada fuente de vitaminas, minerales, fibra y fitoquímicos. El kiwi posee una concentración excepcionalmente alta de vitamina C. Un fruto de tamaño medio puede aportar aproximadamente 90 mg de vitamina C, la cual cosa supera con creces la ingesta diaria recomendada de alrededor de 60 mg.', 2),
(4, 'Naranja', 'static/img/fruits/orange.png', '1.21', 'La naranja es un fruto redondo, color naranja, consumido mayoritariamente en invierno. La pulpa del interior es también anaranjada y está formada por pequeñas bolsitas llenas de zumo.\r\n\r\nLa naranja se usa para consumo en fresco y, para la industria, principalmente en zumo.\r\n\r\nLa naranja, junto con el plátano y la manzana, es uno de los frutos más consumidos en el mundo.\r\n\r\nLa naranja es un cítrico y su forma suele ser redonda u oval y su piel y carne es generalmente naranja, excepto en las variedades de pulpa roja.\r\n\r\nLa parte comestible de la naranja es la pulpa y se consume fresca o en zumo. La naranja también se utiliza para realizar compotas, mermeladas, para consumo como fruta deshidratada, etc.\r\n\r\nDe la naranja también se extraen los aceites esenciales muy utilizados en perfumería y cosmética.\r\n\r\nEl consumo de naranjas en países en vías de desarrollo ha aumentado más rápidamente que en los países ricos. El mercado norteamericano abarca casi la mitad del consumo de los países desarrollados, debido en gran parte al consumo de zumo. En países como en Japón el consumo es en fresco y de producción propia, es decir no necesitan importar naranjas.\r\n', 3),
(5, 'Sandía', 'static/img/fruits/watermelon.png', '1.99', 'La sandía es un fruto grande y de forma más o menos esférica que suele consumirse cruda como postre. Su pulpa es de color rojizo o amarillento y de sabor dulce. Resulta un alimento muy refrescante que aporta muy pocas calorías al organismo, también aporta algunas vitaminas y minerales.\r\n\r\nLa sandía es un fruto grande, de hasta 25cm de diámetro, que puede alcanzar los 15kg de peso. La forma es ovalada o esférica, con una corteza lisa y de color verde oscuro, que a veces presenta bandas irregulares más pálidas. La pulpa es dulce, jugosa, refrescante y de color amarillento o rojizo. Contiene muchas pepitas de color negro, marrón o blanco. Algunas variedades cultivadas en los últimos años, cambian estas características clásicas de las sandías, dando frutos sin semillas, variedades con la pulpa amarilla o sandías de menor tamaño.\r\n\r\nLa sandía se consume generalmente en crudo, en rodajas, cuartos o incluso en bolas. También se emplea para elaborar sorbetes, purés, mermeladas y confituras. En Rusia preparan un vino muy popular a partir de zumo de sandía. La corteza se aprovecha a veces encurtida o confitada y en los medios rurales sirve como alimento del ganado. Las semillas se consumen en algunas regiones tostadas y saladas.\r\n\r\nEs un alimento muy rico en agua que apenas contiene grasas y proteínas, por lo que aporta muy pocas calorías. Además es una fuente importante de potasio y vitamina A. Es un fruto refrescante y con propiedades diuréticas. En muchos países americanos es usada con fines medicinales.', 2),
(6, 'Piña', 'static/img/fruits/pineapple.png', '1.29', 'La piña tropical o piña americana (Ananas comosus) es la fruta obtenida de la planta que recibe el mismo nombre. Su forma es ovalada y gruesa, con aproximadamente 30 cm de largo y 15 cm de diámetro.\n\nLa pulpa comestible se halla rodeada de brácteas verdes que pasan a anaranjadas al madurar, formando la piel del fruto. En el extremo superior las brácteas se transforman en una corona de hojas. La pulpa, amarilla o blanca es carnosa, aromática, jugosa y dulce. En su interior hay un tronco fibroso duro que va desde la corona al pedículo.\n\nLa piña madura tiene una fragancia muy singular. Es de hermoso color y agradable sabor agridulce. Se puede comer cruda o como ingrediente en zumos, conservas, licores, etc. Tanto el fruto como las hojas se usan en la preparación de compuestos medicinales.\n\nLa planta es herbácea y las inflorescencias nacen en lo alto. Estas inflorescencias son ovaladas. El fruto es una infrutescencia que está formado por un conjunto de frutas. Es carnoso y termina en una corona de hojas. Se propaga por esquejes y prefiere el calor.\n\nLa piña tiene un contenido en agua muy alto. Los glúcidos ocupan el segundo lugar y el aporte de proteínas y lípidos es muy escaso. El valor calórico, teniendo en cuenta su composición es muy bajo. Cada 100 g de producto fresco comestible aportan entre 64 y 101 kcal. Por ello es muy adecuada en dietas de adelgazamiento.\n\nLa piña americana se suele consumir fresca, sola o en macedonias. También forma parte de pasteles y diversas preparaciones. Gran parte de la producción mundial se destina a la industria conservera para obtener piña en almíbar. Otro gran uso es para la obtención de zumo de piña. Esta fruta sirve igualmente de materia prima para elaborar compotas, mermeladas y confituras. En la cocina china es un ingrediente principal combinándola con cerdo y pato.\n\nEs una fruta muy sensible a los cambios bruscos de temperatura. Las temperaturas aconsejadas para piñas parcialmente maduras son entre 10-13ºC y para piñas maduras de 7-10ºC. Así. las humedades relativas óptimas de esta fruta son entre 85 y 90%.', 2),
(7, 'Granada', 'static/img/fruits/pomegranate.png', '1.79', 'La granada es una infrutescencia, fruto de un árbol llamado granado que alcanza hasta cuatro metros de altura, de la familia de las Punicáceas; pequeña familia de árboles y arbustos, cuyos frutos tienen semillas prismáticas y rugosas.\r\n\r\nLa fruta posee una piel gruesa de color escarlata o dorada con tono carmesí en el exterior y una gran cantidad de semillas internas rodeadas de una jugosa pulpa de color rubí. En oriente es considerada como un símbolo del amor y de la fecundidad y sus virtudes han sido difundidas por poetas tan conocidos como García Lorca.\r\n\r\nEs una fruta de muy bajo valor calórico debido a su escaso contenido de hidratos de carbono. El componente mayoritario es el agua y en lo que se refiere a otros nutrientes, tan sólo destaca su aporte mineral de potasio y su aporte de vitamina C. El potasio es necesario para la transmisión y generación del impulso nervioso, y para la actividad muscular normal interviene en el equilibrio de agua dentro y fuera de la célula.\r\n\r\nLa vitamina C interviene en la formación de colágeno, huesos y dientes, glóbulos rojos, y favorece la absorción del hierro de los alimentos y la resistencia a las infecciones. Otros componentes destacables son el ácido cítrico (de acción desinfectante, alcaliniza la orina y potencia la acción de la vitamina C), folatos (intervienen en la producción de glóbulos rojos y blancos, en la síntesis de material genético y formación de anticuerpos del sistema inmunológico), el ácido málico, los flavonoides (pigmentos de acción antioxidante) y los taninos. Estos últimos son sustancias con propiedades astringentes y antiinflamatorias. Algunas de las acciones de los taninos son secar y desinflamar la mucosa intestinal (capa que tapiza el interior del conducto digestivo), por lo que resultan eficaces en el tratamiento de la diarrea. Los taninos se reconocen rápidamente por la sensación áspera que producen al paladar.', 1),
(8, 'Berenjena', 'static/img/fruits/aubergine.png', '1.90', 'La berenjena (Solanum melongena) es un fruto de forma variable que puede ir de esférica a ovoide y oblonga. El color es morado y más o menos intenso, blanca con bandas blancas moradas, amarillas, anaranjadas o incluso negras. La carne firme y suave es siempre blanca y contiene numerosas semillas comestibles del mismo color. Su carne se consume a modo de verdura, frita o rebozada en rodajas.\r\n\r\nEn su composición posee un elevado porcentaje de agua, siendo su contenido en glúcidos, proteínas y lípidos muy bajo. La berenjena cocida y pelada es muy digestible. Generalmente las berenjenas más sabrosas son las más tiernas y firmes, de unos 5-8 cm de diámetro. Las piezas más grandes y maduras suelen resultar más fibrosas y amargas. Así, el fruto se suele cosechar cuando aún no está maduro para evitar la amargura, que crezcan semillas y la dureza de la piel.\r\n\r\nEs muy sensible a los cambios de temperatura, por lo que es conveniente conservarla en el refrigerador. Nunca se debe envolver en un film alimentario, ya que éste impide su respiración. Conviene mantenerla en un lugar lo más aislado posible, puesto que reacciona con el etileno producido por otras verduras y frutas de manera que se acelera su envejecimiento y además el pedúnculo pierde su color verde que es síntoma de frescura. Manteniéndolas a 4-6ºC se pueden conservar en perfectas condiciones durante unos 7 días.\r\n\r\nSu valor calórico es muy escaso, aportando 15-17 kcal por cada 100 g de producto fresco, siendo muy utilizada en dietas de adelgazamiento. Es una buena fuente de potasio.\r\n\r\nLa berenjena se caracteriza por su suave sabor y por lo versátil que resulta para ser combinada. Se aconseja salarla antes de su cocción para eliminar los jugos amargos y reducir su humedad. Así se consigue una pulpa más densa que absorbe menos cantidad de aceite. También se puede añadir un poco de zumo de limón con el fin de eliminar este contenido en jugos amargos. Es muy tradicional en la cocina griega y francesa. En nuestro país, forma parte del plato catalán conocido como escalivada, donde se asa con otras hortalizas como el pimiento y la cebolla. Suelen ser consumidas rellenas de carne, verduras, jamón, etc, que finalmente se pueden gratinar con queso antes de ser servidas. Pueden ser utilizadas para preparar cremas y purés y además se elaboran numerosas conservas, tanto dulces como saladas, como la confitura de berenjenas y las conservas de berenjenas al natural o en aceite.\r\n\r\nLa berenjena es muy clásica en la cocina árabe. En zonas del sur de España es también muy habitual su consumo.', 3),
(9, 'Fruta del Dragón', 'static/img/fruits/dragon-fruit.png', '15.00', 'La pitahaya o fruta dragón es una fruta exótica de color intenso, rojo oscuro, rosa o amarillo, con un interior que puede ser de color blanco o rosa, en función de la variedad de cactus de la que sea recogida. Su sabor es extremadamente dulce y con un toque que recuerda al kiwi o la papaya, e incluso al aguacate.\r\n\r\nEl origen de esta nueva fruta se sitúa en Latinoamérica, principalmente en México, a pesar de que hoy en día su cultivo se ha extendido a más países de la zona e incluso a regiones de China y Vietnam. Hace siglos que los colonos de estos países se enamoraron de esta fruta y las exportaron a otras de las zonas que iban conquistando.\r\n\r\nPodemos distinguir dos tipos principales de fruta dragón:\r\n\r\nPitahaya amarilla: De color amarillo y con espinas . Tiene un mayor contenido en azúcar, por lo que su sabor es más dulce. Por su forma y color, suele recordar a las piñas.\r\nPitahaya roja: A diferencia de la variedad amarilla, no tiene espinas sino brácteas. Tiene un tamaño ligeramente superior y una corteza más dura.\r\n\r\nOtra de las peculiaridades de esta fruta dragón es que su período de floración dura una noche, tiempo en el que poliniza y crece el fruto.\r\n\r\nLas flores emiten un olor muy agradable que puede ser percibido fácilmente allí dónde crezca la planta pero que, sin embargo, nada más ser cortada pierde de golpe.\r\n \r\nAlgunas propiedades de la fruta dragón\r\n\r\nCompuesta principalmente de agua, la pitahaya contiene importantes minerales como hierro, calcio y fósforo, así como infinidad de vitaminas (vitaminas B1, B2, B3 y C) perfectas para mantener nuestro organismo sano. De hecho, está especialmente indicada para las personas que sufren de elevado colesterol y para aquellas que están preocupadas por fortalecer su sistema inmunológico.\r\n\r\nLa pitaya es una fruta diurética que, además de impedir que retengas líquidos, te mantendrá hidratado.\r\nAl ser una fuente de vitamina C es considerada una fruta con propiedades antioxidantes, lo que significa que retrasará los signos de envejecimiento en tu piel. Igualmente combate el riesgo de padecer enfermedades crónicas degenerativas y cardiovasculares.\r\nSi quieres perder peso será una de tus mejores aliadas porque su perfil calórico es mínimo.\r\nLas semillas que están presentes en el 60 % de la pulpa de esta fruta exótica mejoran el proceso intestinal y evitan el estreñimiento.\r\nLa captina es el componente dominante en las semillas de la fruta del dragón o pitaya, y reduce el riesgo de sufrir arritmias, además de mejorar el funcionamiento del corazón.\r\n', 1),
(10, 'Ciruela', 'static/img/fruits/plum.png', '1.99', 'La ciruela es una fruta de hueso, redonda o alargada que puede ser de color amarillo, verde, rojo o lila. En general es muy nutritiva y rica en vitaminas, destacando la vitamina C. Según su contenido en agua es más o menos jugosa. Las ciruelas pasas o deshidratadas se conservan más tiempo y son muy dulces.\r\n\r\nEn el mercado hay otros productos elaborados con ciruela como son mermeladas, zumos y licores.\r\n\r\nLas ciruelas se pueden consumir frescas como postre o se puede utilizar para elaborar pasteles rellenos, mermelada, gelatina, zumo, licores, etc. Algunas especies pueden desecarse sin fermentar, como las ciruelas pasas, de las cuales hay en el mercado unas menos deshidratadas de sabor muy agradable. La ciruela pasa se conserva durante más tiempo que la ciruela fresca.\r\n\r\nEs un alimento muy energético, ya que tiene entre 36 y 52kcal/100g. Además, cien gramos aportan unos 5mg de vitamina C.\r\n\r\nLa ciruela, junto con el melocotón, la pera y la almendra, pertenece a la familia de las Rosáceas y al género Prunus, el cuál incluye algunos árboles y arbustos que son puramente ornamentales.\r\n\r\nLa estructura de todos los frutos pertenecientes al género Prunus es, de hecho, similar a los frutos individuales de zarzamoras o frambuesas; el hueso que hay en su interior es la parte más dura del ovario, y la más carnosa es la capa más externa del ovario. La semilla está dentro del hueso. Los botánicos se refieren a tales frutos como ‘frutos de hueso’. Sólo la semilla o almendra del almendro dulce se come normalmente; en otros frutos del género Prunus la almendra es desagradablemente amarga y usualmente se desecha.\r\n\r\nExisten distintas variedades de ciruela, pueden ser redondas o alargadas, de diferentes sabores y colores, pueden ser de color amarillo, verde, rojo o lila y pueden variar en tamaño y textura; así como su contenido en agua también es variable y los diferentes usos de cada una de las variedades.\r\n\r\nLa época de cosecha va desde mediados de junio hasta agosto, aunque la recolección puede ser más temprana en algunas variedades más precoces y en determinados lugares. Las ciruelas se pueden conservar en cámaras frigoríficas durante un tiempo y una práctica útil, aún poco extendida, es la de la pre-refrigeración.', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `malsonantes`
--
ALTER TABLE `malsonantes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_marca` (`id_marca`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `malsonantes`
--
ALTER TABLE `malsonantes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`);
COMMIT;

-- Usuario 
CREATE USER 'fruity_user'@'%' IDENTIFIED WITH mysql_native_password BY '!RO1MjRTR9Mc[n.Y';GRANT USAGE ON *.* TO 'fruity_user'@'%';
ALTER USER 'fruity_user'@'%' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0; 

GRANT SELECT, INSERT, UPDATE ON `fruity\_db`.* TO 'fruity_user'@'%'; ALTER USER 'fruity_user'@'%' ; 


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

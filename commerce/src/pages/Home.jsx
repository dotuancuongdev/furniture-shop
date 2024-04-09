import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import MyCarousel from "../components/Carousel";

const rate = [
  {
    name: "Jonny",
    rate: 5,
    img: "https://file.hstatic.net/200000065946/article/minh-tam-le-nguyen_b5fbd17913f74a80b92ad4968ba54d65_large.jpg",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
  },
  {
    name: "Nguyen Hung",
    rate: 4.4,
    img: "https://file.hstatic.net/200000065946/article/ngo-gia-bao-06_395f19cf98944e3da89ff0cca8be4fef_large.jpg",
    text: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All ",
  },
  {
    name: "Michael McCullough",
    rate: 3.6,
    img: "https://file.hstatic.net/200000065946/article/noi-that-moho-ghe-sofa-fyn-ghe-don-ban-tra-sofa-milan_986e36eccd154fb6ad59569c87554b45_large.jpg",
    text: "discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of  (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first",
  },
  {
    name: "Emmie Rice",
    rate: 4.2,
    img: "https://file.hstatic.net/200000065946/article/review-phong-an-bo-ban-an-6-ghe-moss-1_21e53ff4e30e439bb8fac7c0526e3bae_large.jpg",
    text: "combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free",
  },
  {
    name: "Keith Mora",
    rate: 5,
    img: "https://file.hstatic.net/200000065946/article/noi-that-moho-tu-tivi-vline-ke-sach-oslo-bo-ban-an-fyn_a8cacf5254324fcfac541b3ce04a4d74_large.jpg",
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
  {
    name: "Hadley Black",
    rate: 5,
    img: "https://file.hstatic.net/200000065946/article/noi-that-moho-sofa-vline-ban-sofa-milan_8e1b7b077e39491785f02cc4b9665b23_large.jpg",
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    name: "Piper Gallegos",
    rate: 4.2,
    img: "https://file.hstatic.net/200000065946/article/noi-that-ke-sach-moho-oslo-901-1_12c3fc5066424f3893dc0bd59eb78e94_large.jpg",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look",
  },
  {
    name: "Hudson Washington",
    rate: 4.8,
    img: "https://file.hstatic.net/200000065946/article/z2963070935615_4a1e1f30e54cebd570e0f9713efa0931__2__24bb952f701e48ffba7882193fa9ecd8_large.jpg",
    text: "and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
  },
  {
    name: "Marco",
    rate: 3.6,
    img: "https://file.hstatic.net/200000065946/article/z2963070935615_4a1e1f30e54cebd570e0f9713efa0931__2__24bb952f701e48ffba7882193fa9ecd8_large.jpg",
    text: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined ",
  },
  {
    name: "Romina Rowland",
    rate: 4.6,
    img: "https://file.hstatic.net/200000065946/article/tu-ke-tivi-dep_4463cd8432744463ab8c8d61e15b8941_large.jpg",
    text: "standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from ",
  },
];
const partners = [
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_3.png?v=312",
  },
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_2.png?v=312",
  },
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_10.png?v=312",
  },
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_4.png?v=312",
  },
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_9.png?v=312",
  },
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_8.png?v=312",
  },
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_6.png?v=312",
  },
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_1.png?v=312",
  },
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_7.png?v=312",
  },
  {
    img: "https://theme.hstatic.net/200000065946/1001187274/14/logo_items_5.png?v=312",
  },
];
const news = [
  {
    name: "Workshop “Họa Sĩ Trồng Cây”: Gác Lại Mọi Bộn Bề Cuộc Sống Cùng MOHO X dghome",
    img: "https://file.hstatic.net/200000065946/article/workshop-hoa-si-trong-cay_3172f29f49c340c3b6fbf87c07fdf8b7_large.jpg",
    text: "With this online tool, you can convert any text into a similar-looking but completely fake version of the text. The program replaces some letters, characters, and symbols in the text with visually similar but fake Unicode characters. The most common use case of this tool is creating tests for content filtering and moderation systems. The fake text can often bypass the filters and end up in the database and this tool lets you generate test cases for robust filters. For example, the word  becomes that looks exactly the same as the original word but its second letter  is a fake character  that looks identical to the real one. The fake symbols are always indistinguishable from the original ones they do not differ in shape, size, or style",
  },
  {
    name: "Nội Thất MOHO Khai Trương Cửa Hàng Thứ 02 Tại Hà Nội",
    img: "https://file.hstatic.net/200000065946/article/noi-that-moho-khai-truong-cua-hang-showroom-ha-noi_6ce6564dca0045db87fec35a50dff12c_large.jpg",
    text: "When referring to Lorem ipsum, different expressions are used, namely fill text , fictitious text , blind text or placeholder text : in short, its meaning can also be zero, but its usefulness is so clear as to go through the centuries and resist the ironic and modern versions that came with the arrival of the web",
  },
  {
    name: "MOHO Tham Gia Dự Án Trồng Rừng Ngập Mặn Tại Sóc Trăng",
    img: "https://file.hstatic.net/200000065946/article/noi-that-moho-tham-gia-trong-rung_e5e2225bc7374b5e842a6a08bbcc45cf_large.jpg",
    text: "Lorem ipsum contains the typefaces more in use, an aspect that allows you to have an overview of the rendering of the text in terms of font choice and font size",
  },
  {
    name: "Moho X Dghome: Tặng Khách Hàng Voucher Trị Giá Đến 2 Triệu Đồng",
    img: "https://file.hstatic.net/200000065946/article/voucher-mua-noi-that-moho_8375d850f7884e2aacffe445be8e7260_large.jpg",
    text: "A discovery that has given greater importance to the Lorem ipsum which has remained on the crest of the wave since 500, that is when, according to Professor Richard McClintock, its use spread among the printers of the time",
  },
  {
    name: "Cơ hội sở hữu nội thất với giá tốt nhất",
    img: "https://file.hstatic.net/200000065946/article/co-hoi-so-huu-noi-that-gia-tot_8430957719ab42878f26e569f494777d_large.jpg",
    text: "Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscpit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
  },
  {
    name: `Hãy cùng MOHO góp cây cho rừng với nhiều ưu đãi mua sắm nội thất hấp dẫn chỉ trong tháng 6 này từ 01/06/2023 đến 30/06/2023 nhé.1. MÃ ƯU ĐÃI ĐA DẠNGMOHO50K:...`,
    img: "https://file.hstatic.net/200000065946/article/noi-that-moho-khuyen-mai-mua-sam-thang-6-3_8022f76b809e4060a242eda0e3253e3e_large.jpg",
    text: "Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls deified among the tiers of shipping and the waterside pollutions of a great (and dirty) city. Fog on the Essex marshes, fog on the Kentish heights. Fog creeping into the cabooses of collier-brigs; fog lying out on the yards and hovering in the rigging of great ships",
  },
];
const slideShowImgs = [
  "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_3.jpg?v=272",
  "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_1_master.jpg?v=317",
  "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_1_master.jpg?v=272",
  "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_4.jpg?v=272",
  "https://theme.hstatic.net/200000065946/1001187274/14/slideshow_4.jpg?v=317",
];

function Item(props) {
  return <img src={props.item} alt="" className="w-full " />;
}

const Home = () => {
  return (
    <>
      <Carousel animation="slide" duration={550}>
        {slideShowImgs.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <Box className="max-w-6xl mx-auto mb-28">
        <Typography variant="h4" className="my-5 font-mono">
          Không gian Sống
        </Typography>
        <Box className="flex justify-center w-full h-auto ">
          <Box className="w-full h-full flex gap-4 mb-10">
            <Box className="flex-1  flex flex-col gap-4 ">
              <img
                src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView1.jpg?v=272"
                alt=""
                className="w-full h-full cursor-pointer  opacity-90 hover:opacity-100 duration-100"
              />
              <img
                src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView2.jpg?v=272"
                alt=""
                className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
              />
            </Box>
            <Box className="flex-[2] flex flex-col gap-4 ">
              <Box className="flex-[6]  cursor-pointer ">
                <img
                  src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView3.jpg?v=272"
                  alt=""
                  className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
                />
              </Box>
              <Box className="flex-[4] flex gap-4">
                <Box className="flex-1 ">
                  <img
                    src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView4.jpg?v=272"
                    alt=""
                    className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
                  />
                </Box>
                <Box className="flex-1 ">
                  <img
                    src="https://theme.hstatic.net/200000065946/1001187274/14/imgaView5.jpg?v=272"
                    alt=""
                    className="w-full h-full cursor-pointer opacity-90 hover:opacity-100 duration-100"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography className="my-5 text-2xl font-mono">
            Đánh giá thực tế
          </Typography>
          <MyCarousel items={rate} />
        </Box>
        <Box>
          <Typography className="my-5 text-2xl font-mono">
            Tin tức mới nhất
          </Typography>
          <MyCarousel items={news} />
        </Box>
        <Box>
          <Typography className="my-5 text-2xl font-mono">
            Khách hàng
          </Typography>
          {/* <MyCarousel items={partners} /> */}
        </Box>
      </Box>
    </>
  );
};

export default Home;

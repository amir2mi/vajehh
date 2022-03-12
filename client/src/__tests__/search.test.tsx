/* eslint-disable testing-library/no-node-access */
import axios from "axios";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestWrapper } from "../components";
import SearchPage from "../pages/search";

// create a mock axios instance for fake API calls
jest.mock("axios");

interface ResponseProps {
  _id: string;
  definition: string[] | string;
  title: string;
}

interface FakeResponseProps {
  kind: string;
  items: string[] | ResponseProps[];
}

function returnFakeResponse(data: FakeResponseProps) {
  const response = new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: data,
        }),
      0
    );
  });

  return response;
}

function setupFakeEndpoints() {
  // API call has different response just for Emlaei
  (axios.get as jest.Mock).mockImplementation((url) => {
    if (url.includes("/emlaei")) {
      return returnFakeResponse({
        kind: "emlaei",
        items: ["جمال", "شمال"],
      });
    } else if (url.includes("/motaradef")) {
      return returnFakeResponse({
        kind: "motaradef",
        items: [
          {
            _id: "6214ec0eac881d0bb8a4e10c",
            title: "کمال‌طلب",
            definition: ["استغنا", "بلوغ", "پختگی"],
          },
          {
            _id: "6214ebfcac881d0bb8a4c3e3",
            title: "استغنا (متضاد: نیازمندی، نیاز)",
            definition: ["علوطبع", "کمال", "ناز"],
          },
          {
            _id: "6214ec09ac881d0bb8a4d836",
            title: "رسایی",
            definition: ["بلاغت", "کمال", "رسیدگی (متضاد: نارسایی)"],
          },
        ],
      });
    } else if (url.includes("/sereh")) {
      return returnFakeResponse({
        kind: "sereh",
        items: [
          {
            _id: "62136e2fac881d0bb81420cf",
            title: "کمال",
            definition: ["والایی", "کهتری", "فرهیختگی", "فرگشتگی", "فرازمندی"],
          },
          {
            _id: "62136e2fac881d0bb81420c7",
            title: "کمال طلبانه",
            definition: ["آرمانگرایانه"],
          },
        ],
      });
    } else if (url.includes("/teyfi")) {
      return returnFakeResponse({
        kind: "teyfi",
        items: [
          {
            _id: "62136e5cac881d0bb8144aa8",
            title: "به‌کمال رسیدن",
            definition: ["ایده‌آل", "معصومیت", "خطاناپذیری", "بلوغ"],
          },
          {
            _id: "62136e5cac881d0bb8144ab5",
            title: "نمونهٔ کمال",
            definition: ["اسوه", "ابرمرد", "انسان والا", "شاهکار"],
          },
          {
            _id: "62136e4dac881d0bb8143849",
            title: "کاملا",
            definition: ["تماما", "به‌کلی", "کلا", "یکسر", "یک‌سره", "سربه‌سر", "دریک‌نوبت", "تمام‌وکمال"],
          },
        ],
      });
    } else if (url.includes("/farhangestan")) {
      return returnFakeResponse({
        kind: "farhangestan",
        items: [
          {
            _id: "62137b36c7d4d17a26e76087",
            title: "least-upper-bound axiom",
            definition: ["اصل کوچک‌ترین کران بالا", "اصل موضوع کمال", "[ریاضی]"],
          },
          {
            _id: "62137a7dc7d4d17a26e6ffb1",
            title: "axiom of linear completeness",
            definition: ["اصل موضوع کمال خطی", "یکی از اصول موضوع دستگاه اصل موضوعی هیلبرت در هندسه", "[ریاضی]"],
          },
        ],
      });
    } else if (url.includes("/ganjvar")) {
      return returnFakeResponse({
        kind: "ganjvar",
        items: [
          {
            _id: "62150663c7d4d17a2635d37d",
            title: "رشیدالدین وطواط | رباعیات | شمارهٔ ۹ - در مدح کمال الدین",
            definition: [
              "عنوان ظفر نام کمال الدینست",
              "مقصود جهان کام کمال الدینست",
              "هر جا که یکی صاحب فضلست امروز",
              "در سایهٔ انعام کمال الدینست",
            ],
          },
        ],
      });
    }
  });
}

describe("Search functionality", () => {
  const setup = () => {
    const view = render(
      <TestWrapper>
        <SearchPage />
      </TestWrapper>
    );

    return view;
  };

  afterEach(() => cleanup());

  //    // check if the loading (fake definition boxes) are displayed correctly
  //    await waitFor(() => {
  //     expect(screen.getAllByRole("heading", { level: 2 })).toHaveTextContent("در حال جستجو");
  //   });

  it("should search the word in Motaradef dictionary and display the result correctly", async () => {
    setupFakeEndpoints();
    const { container } = setup();
    const searchInput = screen.getByRole("textbox");

    // type something to initiate the search
    userEvent.type(searchInput, "کمال");

    // check if the result title is displayed correctly
    await waitFor(() => {
      expect(container.querySelector(".motaradef .definition-box:first-child .definition-title")).toHaveTextContent(
        "کمال‌طلب"
      );
    });
    // check if the result definition is displayed correctly
    await waitFor(() => {
      expect(container.querySelector(".motaradef .definition-box:first-child .definition")).toHaveTextContent(
        "استغنا، بلوغ، پختگی"
      );
    });
  });

  it("should search the word in Sereh dictionary and display the result correctly", async () => {
    setupFakeEndpoints();
    const { container } = setup();
    const searchInput = screen.getByRole("textbox");

    // type something to initiate the search
    userEvent.type(searchInput, "کمال");

    // check if the result title is displayed correctly
    await waitFor(() => {
      expect(container.querySelector(".sereh .definition-box:first-child .definition-title")).toHaveTextContent("کمال");
    });
    // check if the result definition is displayed correctly
    await waitFor(() => {
      expect(container.querySelector(".sereh .definition-box:first-child .definition")).toHaveTextContent(
        "والایی، کهتری، فرهیختگی، فرگشتگی، فرازمندی"
      );
    });
  });

  it("should search the word in Teyfi dictionary and display the result correctly", async () => {
    setupFakeEndpoints();
    const { container } = setup();
    const searchInput = screen.getByRole("textbox");

    // type something to initiate the search
    userEvent.type(searchInput, "کمال");

    // check if the result title is displayed correctly
    await waitFor(() => {
      expect(container.querySelector(".teyfi .definition-box:first-child .definition-title")).toHaveTextContent(
        "به‌کمال رسیدن"
      );
    });
    // check if the result definition is displayed correctly
    await waitFor(() => {
      expect(container.querySelector(".teyfi .definition-box:first-child .definition")).toHaveTextContent(
        "ایده‌آل، معصومیت، خطاناپذیری، بلوغ"
      );
    });
  });

  it("should search the word in Farhangestan dictionary and display the result correctly", async () => {
    setupFakeEndpoints();
    const { container } = setup();
    const searchInput = screen.getByRole("textbox");

    // type something to initiate the search
    userEvent.type(searchInput, "کمال");

    // check if the result title is displayed correctly
    await waitFor(() => {
      expect(container.querySelector(".farhangestan .definition-box:first-child .definition-title")).toHaveTextContent(
        "least-upper-bound axiom"
      );
    });

    // check if the result definition is displayed correctly
    // Farhangestan put each line in a separate [.definition] element, so check each line if it has the correct info
    await waitFor(() => {
      expect(
        container.querySelector(".farhangestan .definition-box:first-child .definition:nth-of-type(1)")
      ).toHaveTextContent("اصل کوچک‌ترین کران بالا");
    });
    await waitFor(() => {
      expect(
        container.querySelector(".farhangestan .definition-box:first-child .definition:nth-of-type(2)")
      ).toHaveTextContent("اصل موضوع کمال");
    });
    await waitFor(() => {
      expect(
        container.querySelector(".farhangestan .definition-box:first-child .definition:nth-of-type(3)")
      ).toHaveTextContent("[ریاضی]");
    });
  });

  it("should search the word in Ganjvar dictionary and display the result correctly", async () => {
    setupFakeEndpoints();
    const { container } = setup();
    const searchInput = screen.getByRole("textbox");

    // type something to initiate the search
    userEvent.type(searchInput, "کمال");

    // check if the result title is displayed correctly
    await waitFor(() => {
      expect(container.querySelector(".ganjvar .definition-box:first-child .definition-title")).toHaveTextContent(
        "رشیدالدین وطواط | رباعیات | شمارهٔ ۹ - در مدح کمال الدین"
      );
    });

    // check if the result definition is displayed correctly
    // Ganjvar put each line in a separate [.definition] element, so check each line if it has the correct info
    await waitFor(() => {
      expect(
        container.querySelector(".ganjvar .definition-box:first-child .definition:nth-of-type(1)")
      ).toHaveTextContent("عنوان ظفر نام کمال الدینست");
    });
    await waitFor(() => {
      expect(
        container.querySelector(".ganjvar .definition-box:first-child .definition:nth-of-type(2)")
      ).toHaveTextContent("مقصود جهان کام کمال الدینست");
    });
    await waitFor(() => {
      expect(
        container.querySelector(".ganjvar .definition-box:first-child .definition:nth-of-type(3)")
      ).toHaveTextContent("هر جا که یکی صاحب فضلست امروز");
    });
    await waitFor(() => {
      expect(
        container.querySelector(".ganjvar .definition-box:first-child .definition:nth-of-type(4)")
      ).toHaveTextContent("در سایهٔ انعام کمال الدینست");
    });
  });

  it("should check if suggestions are displayed correctly", async () => {
    const { container } = setup();
    setupFakeEndpoints();
    const searchInput = screen.getByRole("textbox");

    // type something to initiate the search
    userEvent.type(searchInput, "کمال");

    // fake Emlaei API call always return "جمال" & "شمال"
    await waitFor(() => {
      expect(container.querySelector(".search-info")).toHaveTextContent("منظورتان جمال یا شمال بود؟");
    });
  });
});

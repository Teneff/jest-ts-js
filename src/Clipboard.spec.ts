// Object.assign(navigator, {
//   clipboard: {
//     writeText: () => {},
//   },
// });

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: jest.fn(),
  },
});

const dummyTextWriter = () => {
  navigator.clipboard.writeText("zxc");
};

describe("Clipboard", () => {
  describe("writeText", () => {
    jest.spyOn(navigator.clipboard, "writeText");
    beforeAll(() => {
      dummyTextWriter();
    });
    it("should call clipboard.writeText", () => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("zxc");
    });
  });
});

import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import FavoriteButton from "../src/components/FavoriteButton";
import userEvent from "@testing-library/user-event";
import { useFavorites } from "@/hooks/useFavorites";
import { beforeEach, describe, it, expect } from "@jest/globals";
import { jest } from "@jest/globals";

jest.mock("@/hooks/useFavorites", () => ({
  __esModule: true,
  useFavorites: jest.fn(),
}));

describe("FavoriteButton", () => {
  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();
  const mockToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not render when isLoaded is false", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn(),
      toggleFavorite: mockToggleFavorite,
      isLoaded: false,
    });

    const result = render(<FavoriteButton imdbID="tt1234567" />);
    expect(result.container.firstChild).toBeNull();
  });

  it("should render button with unfavorite styles when not favorited", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: mockToggleFavorite,
      isLoaded: true,
    });

    render(<FavoriteButton imdbID="tt1234567" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-gray-100");
    expect(button.className).toContain("text-gray-400");
  });

  it("should render button with favorite styles when favorited", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(true),
      toggleFavorite: mockToggleFavorite,
      isLoaded: true,
    });

    render(<FavoriteButton imdbID="tt1234567" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-red-100");
    expect(button.className).toContain("text-red-600");
  });

  it("should call toggleFavorite on button click", async () => {
    const user = userEvent.setup();
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: mockToggleFavorite,
      isLoaded: true,
    });

    render(<FavoriteButton imdbID="tt1234567" />);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(mockToggleFavorite).toHaveBeenCalledWith("tt1234567");
  });

  it("should have correct aria-label when not favorited", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: mockToggleFavorite,
      isLoaded: true,
    });

    render(<FavoriteButton imdbID="tt1234567" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Dodaj do ulubionych");
  });

  it("should have correct aria-label when favorited", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(true),
      toggleFavorite: mockToggleFavorite,
      isLoaded: true,
    });

    render(<FavoriteButton imdbID="tt1234567" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Usuń z ulubionych");
  });
});

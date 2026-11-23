import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProfilePageContent } from "../components/profile-page-content";

describe("ProfilePageContent", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("renders the Spanish profile and switches between the four sections", () => {
    render(<ProfilePageContent locale="es" />);
    expect(screen.getByText("Vista de demostración")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Backoffice — Vista previa" })).toBeDisabled();
    expect(screen.getByText("Encargos activos")).toBeInTheDocument();
    expect(screen.getByText("Pedidos completados")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(4);
    fireEvent.click(screen.getByRole("tab", { name: "Métodos de pago" }));
    expect(screen.getByText("Tarjeta de crédito o débito")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "Descarga de archivos" }));
    expect(screen.getByRole("link", { name: "Descargar archivo: Archivo digital de muestra" })).toHaveAttribute("download");
    expect(screen.getAllByText("STL · Archivo digital")).toHaveLength(4);
    expect(screen.getAllByText("Detalles")).toHaveLength(4);
    expect(screen.getByRole("img", { name: "Kit de piezas imprimibles" })).toBeInTheDocument();
    expect(screen.queryByText(/Modelo 3D imprimible/)).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "Detalles" })[0]);
    expect(screen.getByText(/Modelo 3D imprimible/)).toBeInTheDocument();
    expect(window.location.search).toBe("?tab=downloads");
    fireEvent.click(screen.getByRole("tab", { name: "Pedidos y encargos" }));
    expect(screen.getByText("En preparación")).toBeInTheDocument();
    expect(screen.getByText("En producción")).toBeInTheDocument();
    expect(screen.getAllByText("Actualizado hoy")).toHaveLength(2);
    expect(screen.queryByRole("list", { name: /Progreso/ })).not.toBeInTheDocument();
    const detailsButtons = screen.getAllByRole("button", { name: "Detalles" });
    expect(detailsButtons).toHaveLength(2);
    fireEvent.click(detailsButtons[0]);
    expect(screen.getByRole("list", { name: "Progreso del pedido" })).toBeInTheDocument();
    expect(screen.getByText(/2026-0142/)).toBeInTheDocument();
    expect(screen.getByText("Pago recibido", { exact: true })).toBeInTheDocument();
    expect(screen.getByText(/progreso no está conectado/i)).toBeInTheDocument();
    fireEvent.click(detailsButtons[1]);
    expect(screen.getByRole("list", { name: "Progreso del encargo" })).toBeInTheDocument();
    expect(screen.getByText(/2026-0038/)).toBeInTheDocument();
    expect(screen.getByText("Presupuesto aceptado", { exact: true })).toBeInTheDocument();
  });

  it("edits demo details without claiming persistence", () => {
    render(<ProfilePageContent locale="en" />);
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Jamie" } });
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(screen.getByRole("heading", { name: "Jamie" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("not been saved to an account");
    fireEvent.click(screen.getByLabelText("Billing same as shipping address"));
    expect(screen.getByLabelText("Billing same as shipping address")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Billing address"), { target: { value: "Example address" } });
    fireEvent.click(screen.getByRole("tab", { name: "Payment methods" }));
    fireEvent.click(screen.getByRole("tab", { name: "Personal details" }));
    expect(screen.getByLabelText("Billing address")).toHaveValue("Example address");
  });

  it("supports keyboard navigation between tabs", () => {
    render(<ProfilePageContent locale="en" />);
    const first = screen.getByRole("tab", { name: "Personal details" });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Payment methods" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Payment methods" })).toHaveAttribute("aria-selected", "true");
    expect(window.location.search).toBe("?tab=payments");
  });
});
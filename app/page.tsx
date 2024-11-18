'use client';              
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Repeat } from "lucide-react";

export default function Home() {
  const [currencies, setCurrencies] = useState<{ [key: string]: string }>({});
  const [amount, setAmount] = useState<number | string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("usd");
  const [toCurrency, setToCurrency] = useState<string>("eur");
  const [conversionResult, setConversionResult] = useState<number | null>(null);

  // Fetch available currencies on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CURRENCY_API_URL}/currencies.json`
        );
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  // Handle conversion
  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) {
      alert("Please enter a valid amount");
      return;
    }
    console.log(fromCurrency, toCurrency, amount);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CURRENCY_API_URL}/currencies/${fromCurrency}.json`
      );
      const data = await response.json();
      const rate = data[fromCurrency][toCurrency];
      console.log(rate);
      if (rate) {
        setConversionResult(Number(amount) * rate);
      } else {
        alert("Conversion rate not found.");
      }
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-1 w-full flex items-center justify-center">
        <section className="w-full py-8 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 flex flex-col items-center">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Currency Converter
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Fast, reliable, and up-to-date currency and cryptocurrency conversion at your fingertips.
                </p>
              </div>
            </div>
            <div className="w-full space-y-4 pt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Convert Currency</CardTitle>
                  <CardDescription className="text-center">
                    Enter amount and select currencies to convert.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleConvert}>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          placeholder="Enter amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <Label htmlFor="from">From</Label>
                          <Select onValueChange={setFromCurrency} value={fromCurrency}>
                            <SelectTrigger id="from">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {Object.entries(currencies).map(([code, name]) => (
                                <SelectItem key={code} value={code}>
                                  {name} ({code.toUpperCase()})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="mt-6"
                          onClick={() => {
                            setFromCurrency(toCurrency);
                            setToCurrency(fromCurrency);
                          }}
                          type="button"
                        >
                          <Repeat className="h-4 w-4" />
                          <span className="sr-only">Revert currencies</span>
                        </Button>
                        <div className="flex-1 overflow-hidden">
                          <Label htmlFor="to">To</Label>
                          <Select onValueChange={setToCurrency} value={toCurrency}>
                            <SelectTrigger id="to">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {Object.entries(currencies).map(([code, name]) => (
                                <SelectItem key={code} value={code}>
                                  {name} ({code.toUpperCase()})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1.5 max-h-8 min-h-8">

                      {conversionResult !== null && (
                        <div className="text-center">
                            <p>
                            {amount} <strong>{fromCurrency.toUpperCase()}</strong> ={" "}
                            {conversionResult.toFixed(2)} <strong>{toCurrency.toUpperCase()}</strong>
                            </p>
                        </div>
                      )}
                      </div>
                      <Button className="w-full" type="submit">
                        Convert
                        <ArrowRightLeft className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>

                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

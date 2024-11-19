'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, Repeat } from 'lucide-react';
import { toast } from "sonner"
import ArgentinaInfo from "@/components/ArgentinaInfo/argentina-info";
import { Currency } from "@/types/currency";


export default function Home() {
  const [currencies, setCurrencies] = useState<{ [key: string]: string }>({});
  const [currenciesArg, setCurrenciesArg] = useState<Currency[]>([]);
  const [amount, setAmount] = useState<number | string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("usd");
  const [toCurrency, setToCurrency] = useState<string>("chf");
  const [conversionResult, setConversionResult] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("converter");

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

  // Fetch available currencies on component mount
  useEffect(() => {
    const fetchCurrenciesForArgentina = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CURRENCY_API_ARGENTINA_URL}`
        );
        const data = await response.json();
        setCurrenciesArg(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrenciesForArgentina();
  }, []);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) {
      toast.info('Please enter a valid amount')
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CURRENCY_API_URL}/currencies/${fromCurrency}.json`
      );
      const data = await response.json();
      const rate = data[fromCurrency][toCurrency];
      if (rate) {
        setConversionResult(Number(amount) * rate);
      } else {
        toast.error('Conversion rate not available')
      }
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
    }
  };


  return (
    <div className="flex flex-col min-h-screen items-center px-4 justify-center">
      <main className="flex-1 w-full flex items-center justify-center">
        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 flex flex-col items-center mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  Currency Converter
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                  Fast, reliable, and up-to-date currency and cryptocurrency conversion at your fingertips.
                </p>
              </div>
            </div>
            <div className="w-full max-w-2xl space-y-4 pt-8 md:pt-12">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 relative">
                  <TabsTrigger
                    value="converter"
                    className={`
                      relative z-10 transition-all duration-300 ease-in-out
                      ${activeTab === "converter"
                        ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        : "hover:bg-gray-100 dark:hover:bg-[#18181b]"
                      }
                    `}
                  >
                    Currency Converter
                  </TabsTrigger>
                  <TabsTrigger
                    value="argentina"
                    className={`
                      relative z-10 transition-all duration-300 ease-in-out
                      ${activeTab === "argentina"
                        ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        : "hover:bg-gray-100 dark:hover:bg-[#18181b]"
                      }
                    `}
                  >
                    Argentina Info
                  </TabsTrigger>
                  <div
                    className={`
                      absolute top-0 w-1/2 h-full bg-primary rounded-sm
                      transition-transform duration-300 ease-in-out
                      ${activeTab === "argentina" ? "translate-x-full" : "translate-x-0"}
                    `}
                  />
                </TabsList>
                <TabsContent value="converter">
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
                              className="w-full"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <div className="w-full sm:w-[45%]">
                              <Label htmlFor="from">From</Label>
                              <Select onValueChange={setFromCurrency} value={fromCurrency}>
                                <SelectTrigger id="from" className="w-full">
                                  <SelectValue placeholder="Select currency" className="w-full truncate" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                  {Object.entries(currencies).map(([code, name]) => (
                                    <SelectItem key={code} value={code} className="truncate">
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
                                // swap currencies
                                const tempFrom = fromCurrency;
                                setFromCurrency(toCurrency);
                                setToCurrency(tempFrom);
                                // redo the conversion with swapped currencies
                                handleConvert(new Event('submit') as unknown as React.FormEvent);
                              }}
                              type="button"
                            >
                              <Repeat className="h-4 w-4" />
                              <span className="sr-only">Revert currencies</span>
                            </Button>
                            <div className="w-full sm:w-[45%]">
                              <Label htmlFor="to">To</Label>
                              <Select onValueChange={setToCurrency} value={toCurrency}>
                                <SelectTrigger id="to" className="w-full">
                                  <SelectValue placeholder="Select currency" className="w-full truncate" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                  {Object.entries(currencies).map(([code, name]) => (
                                    <SelectItem key={code} value={code} className="truncate">
                                      {name} ({code.toUpperCase()})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-center items-center w-full min-h-[48px] px-2">
                            {conversionResult !== null && (
                              <div className="text-center text-base sm:text-lg md:text-xl font-semibold break-words">
                                <p className="flex flex-wrap justify-center gap-1">
                                  <span>{amount} {fromCurrency.toUpperCase()}</span>
                                  <span>=</span>
                                  <span>{conversionResult.toFixed(2)} {toCurrency.toUpperCase()}</span>
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
                </TabsContent>
                <TabsContent value="argentina">
                  <ArgentinaInfo currenciesArg={currenciesArg} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/uspinner";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { Analytics, AnalyticsSum } from "./types";

export const SummaryButton = ({
  analytics,
  setHasClicked,
  analyticsSum,
}: {
  analytics: Analytics | null;
  setHasClicked: Dispatch<SetStateAction<boolean>>;
  analyticsSum: AnalyticsSum | null;
}) => {
  if (analytics)
    return (
      <Dialog>
        <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
          <DialogTitle>AI summary</DialogTitle>
          <motion.h2
            className="text-3xl font-bold mb-8 text-zinc-800 flex flex-col gap-3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {analyticsSum ? (
              <>
              <p className="text-2xl">{analyticsSum.summary}</p>
              </>
            ) : (
              <div>
                Generating AI summary...
                <Spinner size="large" />
              </div>
            )}
          </motion.h2>
        </DialogContent>
        <div className="flex justify-center content-center p-3">
          <DialogTrigger asChild>
            <motion.h2
              className="text-3xl font-bold mb-8 text-zinc-800"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                className="text-3xl p-7"
                onClick={() => setHasClicked(true)}
              >
                Generate AI Summary
              </Button>
            </motion.h2>
          </DialogTrigger>
        </div>
      </Dialog>
    );
};
